import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { gameState } from "../types";
import { get } from "../utils/http";
import style from "./GameHistory.module.css";

export default function GameHistory() {
  const navigate = useNavigate();

  const [games, setGames] = useState<gameState[]>();

  const fetchGameDetails = useCallback(async () => {
    try {
      const fetchedGames = await get<gameState[]>(
        "http://localhost:5000/api/games/all"
      );
      setGames(fetchedGames);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchGameDetails();
  }, [fetchGameDetails]);

  return (
    <div className={style.container}>
      {games?.map((board, key) => {
        const { createdAt, _id } = board;
        const { winner } = board.body;
        return (
          <div className={style.list} key={key}>
            <p className={style.title}>
              {`Game #${key}
                   @ ${createdAt?.substring(
                     0,
                     createdAt.indexOf("T")
                   )}  - Winner is ${winner}`}
            </p>
            <button
              className={style.button}
              onClick={() => navigate(`/game/${_id}`)}
            >
              View game log
            </button>
          </div>
        );
      })}
    </div>
  );
}
