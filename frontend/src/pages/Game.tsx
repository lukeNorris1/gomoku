import { useState, useContext, useReducer, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BoardContext, UserContext } from "../context";
import { Tile } from "../components";
import { BoardActionType, TILE_STATUS } from "../constants";
import { DB_URL } from "../constants/db_url"
import { boardInfo, gameState } from "../types";
import { post } from "../utils/http";
import style from "./Game.module.css";

type BoardAction = {
  type: BoardActionType;
  payload: any;
};

function boardReducer(state: boardInfo, action: BoardAction) {
  const { size, winner, moves, _id } = state;
  const { type, payload } = action;
  switch (type) {
    case BoardActionType.SELECT:
      return {
        size: size,
        winner: winner,
        moves: [...moves, payload],
        id: _id,
      };
    case BoardActionType.SIZE:
      return { size: payload, winner: winner, moves: moves, id: _id };
    case BoardActionType.WINNER:
      return { size: size, winner: payload, moves: moves, id: _id };
    case BoardActionType.EMPTY:
      return { size: size, winner: winner, moves: [], id: _id };
    case BoardActionType.ID:
      return { size: size, winner: winner, moves: moves, id: _id };
    default:
      return state;
  }
}

export default function Game() {
  const { board } = useContext(BoardContext);
  const [player, setPlayer] = useState("Black");
  const { user } = useContext(UserContext);
  const [gameEnd, setGameEnd] = useState(false);
  const [playerMessage, setPlayerMessage] = useState(
    `Current Player: ${player}`
  );
  const navigate = useNavigate();

  const currentBoard = {
    size: board?.boardSize || 15,
    winner: " ",
    moves: [],
  };
  const [state, dispatch] = useReducer(boardReducer, currentBoard);

  const handleConfirmClick = async () => {
    const validatedGame: gameState = await post(
      `${DB_URL}/api/games/check`,
      {
        state,
      }
    );
    if (
      validatedGame.winner === "Black" ||
      validatedGame.winner === "White" ||
      validatedGame.winner === "Draw"
    ) {
      dispatch({ type: BoardActionType.WINNER, payload: validatedGame.winner });
      setGameEnd(true);
      setPlayer("");
      createGameRequest(validatedGame.winner);
    }
  };

  useEffect(() => {
    if (!gameEnd) handleConfirmClick();
    //updateGameDetails()
  }, [state.moves]);

  useEffect(() => {
    if (player !== "") setPlayerMessage(`Current Player: ${player}`);
    else {
      setPlayerMessage(`Winner: ${state.winner}`);
    }
  }, [player]);

  const restartClick = () => {
    dispatch({ type: BoardActionType.EMPTY, payload: "" });
    dispatch({ type: BoardActionType.WINNER, payload: "" });
    setPlayer("Black");
    setGameEnd(false);
  };

  function leaveButton() {
    if (gameEnd) {
      navigate("/gameHistory");
    } else navigate("/");
  }

  const togglePlayer = () => {
    if (!gameEnd) player === "Black" ? setPlayer("White") : setPlayer("Black");
  };

  async function createGameRequest(winner: string) {
    const finishedGame = {
      body: {
        size: state.size,
        winner: winner,
        moves: state.moves,
      },
    };
    await post(`${DB_URL}/api/games/create`, {
      finishedGame,
    });
  }

  function getStoneStatusAndMoveOrder(index: number) {
    const order = state.moves.findIndex((e) => e === index);
    const status =
      order === -1
        ? TILE_STATUS.AVAILABLE
        : order % 2
        ? TILE_STATUS.WHITE
        : TILE_STATUS.BLACK;
    return { order, status };
  }

  if (!user) return <Navigate to="/" replace />;

  return (
    <div className={style.container}>
      <div className={style.turn}>{playerMessage}</div>
      <div className={style.board}>
        <div
          className={style.tiles}
          onClick={togglePlayer}
          style={{ gridTemplateColumns: `repeat(${currentBoard.size}, 1fr)` }}
        >
          {[...Array(currentBoard.size * currentBoard.size)].map((_, index) => (
            <Tile
              key={`tile-${index}`}
              id={index}
              isSelected={state.moves.includes(index)}
              {...getStoneStatusAndMoveOrder(index)}
              dispatch={dispatch}
              player={player}
            />
          ))}
        </div>
      </div>
      <div className={style.navigation}>
        <button className={style.navText} onClick={restartClick}>
          Restart
        </button>
        <button className={style.navText} onClick={leaveButton}>
          Leave
        </button>
      </div>
    </div>
  );
}
