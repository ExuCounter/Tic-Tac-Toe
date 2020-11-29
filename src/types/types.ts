export type Coordinate = [number, number];

export type Victory = [Coordinate, Coordinate, Coordinate];

export type Cell = "X" | "O" | "";

export type Row = [Cell, Cell, Cell];

export type Board = Row[];
