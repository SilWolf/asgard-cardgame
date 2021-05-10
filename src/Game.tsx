import { Game } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'

type GameStore = {
	cells: string[]
}

const isVictory = (cells: string[]): boolean => {
	const positions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]

	const isRowComplete = (row: number[]) => {
		const symbols = row.map((i) => cells[i])
		return symbols.every((i) => i !== null && i === symbols[0])
	}

	return positions.map(isRowComplete).some((i) => i === true)
}

const isDraw = (cells: string[]): boolean =>
	cells.filter((c) => c === null).length === 0

export const TicTacToe: Game<GameStore> = {
	setup: () => ({ cells: Array(9).fill(null) }),

	turn: {
		moveLimit: 1,
	},

	moves: {
		clickCell: (G, ctx, id: number) => {
			const cells = G.cells

			if (cells[id] !== null) {
				return INVALID_MOVE
			}

			G.cells[id] = ctx.currentPlayer
		},
	},

	endIf: (G, ctx) => {
		if (isVictory(G.cells)) {
			return { winner: ctx.currentPlayer }
		}
		if (isDraw(G.cells)) {
			return { draw: true }
		}
	},
}
