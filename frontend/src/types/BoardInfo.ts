export type boardInfo = {
  size?: number;
  created?: string;
  winner: string;
  moves: number[];
  _id?: string;
};

export interface gameState {
  body: {
    moves: number[];
    size: number;
    winner: string;
  };
  winner: string;
  createdAt?: string;
  _id: any;
}
