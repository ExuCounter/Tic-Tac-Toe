import "./Cell.css";
import { Cell } from "../../types/types";

type CellProps = {
  rowIndex: number;
  colIndex: number;
  children: string;
  currentMove: Cell;
  winner: Cell;
  updateBoard: (row: number, col: number, move: Cell) => void;
};

const CellComponent = ({
  rowIndex,
  colIndex,
  children,
  currentMove,
  winner,
  updateBoard,
}: CellProps) => {
  return (
    <div
      className="cell"
      onClick={() => {
        !winner && updateBoard(rowIndex, colIndex, currentMove);
      }}
    >
      {children}
    </div>
  );
};

export default CellComponent;
