import { useState } from "react";
import { Board, Cell } from "../../types/types";
import { WINNER_COMBINATIONS } from "../../combinations/combinations";
import CellComponent from "../../components/Cell/Cell";
import "./Board.css";

const CellsBoard = () => {
  const [currentMove, setCurrentMove] = useState<Cell>("X");
  const [winner, setWinner] = useState<Cell>("");
  const [draw, setDraw] = useState<Boolean>(false);
  const [board, setBoard] = useState<Board>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const updateBoard = (row: number, col: number, move: Cell) => {
    if (board[row][col] !== "") return false;
    const newBoard: Board = board.slice();
    newBoard[row][col] = move;
    setBoard(newBoard);
    const newCurrentMove: Cell = currentMove === "X" ? "O" : "X";
    setCurrentMove(newCurrentMove);
    const isWinner = checkWinner();
    if (!isWinner) {
      checkDraw();
    }
  };

  const checkWinner = (): Boolean | Cell => {
    for (let victory of WINNER_COMBINATIONS) {
      const firstCell = board[victory[0][0]][victory[0][1]];
      const secondCell = board[victory[1][0]][victory[1][1]];
      const thirdCell = board[victory[2][0]][victory[2][1]];
      if (
        firstCell !== "" &&
        firstCell === secondCell &&
        firstCell === thirdCell
      ) {
        setWinner(firstCell);
        return firstCell;
      }
    }
    return false;
  };

  const checkDraw = () => {
    let isDraw = true;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === "") isDraw = false;
      }
    }
    isDraw && setDraw(isDraw);
  };

  const resetBoard = () => {
    setWinner("");
    setDraw(false);
    setCurrentMove("X");
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  };

  return (
    <div className="Board-container">
      <ul className={"Board"}>
        {board.map((row, rowIndex) => {
          return row.map((cell, cellIndex) => {
            return (
              <CellComponent
                key={rowIndex + cellIndex}
                rowIndex={rowIndex}
                colIndex={cellIndex}
                currentMove={currentMove}
                updateBoard={updateBoard}
                winner={winner}
              >
                {cell}
              </CellComponent>
            );
          });
        })}
      </ul>
      <button onClick={resetBoard} style={{ marginBottom: "20px" }}>
        Reset Board
      </button>
      {draw && "Draw"}
      {winner && `Winner ${winner}`}
    </div>
  );
};

export default CellsBoard;
