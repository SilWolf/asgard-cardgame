import { BoardProps } from 'boardgame.io/react'
import { useCallback } from 'react'
import { TicTacToeStore } from './Game'
import styled from 'styled-components'

const BoardTable = styled.table`
	td {
		border: 1px solid #555;
		width: 50px;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}
`

const ResultText = styled.div`
	font-weight: bold;
`

type Props = BoardProps<TicTacToeStore>

const boardArray = [0, 1, 2] as const

export const TicTacToeBoard = ({ G, moves, ctx }: Props): JSX.Element => {
	const handleClick = useCallback((id) => moves?.clickCell(id), [moves])

	return (
		<div>
			<BoardTable>
				{boardArray.map((i) => (
					<tr key={i}>
						{boardArray.map((j) => (
							<td key={j} onClick={() => handleClick(i * 3 + j)}>
								{G.cells[i * 3 + j]}
							</td>
						))}
					</tr>
				))}
			</BoardTable>
			{ctx.gameover &&
				(ctx.gameover?.winner ? (
					<ResultText>Winner: {ctx.gameover?.winner}</ResultText>
				) : (
					<ResultText>Draw!</ResultText>
				))}
		</div>
	)
}
