import { useParams, useNavigate } from "react-router-dom";
import { gameState } from "../types";
import { Button, DisplayTile } from "../components";
import style from "./GameHistoryDetails.module.css";
import { useEffect, useState } from "react";
import { get } from "../utils/http";
import { DB_URL } from "../constants/db_url";

export default function GameHistoryDetails() {
  const { boardId = "" } = useParams();
  const navigate = useNavigate();
  const [gameDetails, setGameDetails] = useState<gameState>();

  const fetchGameDetails = async (id: string) => {
    const fetchedGame = await get<gameState>(
      `${DB_URL}/api/games/${id}`
    );
    setGameDetails(fetchedGame);
  };

  useEffect(() => {
    fetchGameDetails(boardId);
  }, [boardId]);

  if (!gameDetails) return null

  const { size, winner, moves } = gameDetails.body;

  function tileColor(index: number) {
    const tileIndex = moves.indexOf(index);
    if (moves.includes(index) && tileIndex % 2 === 1) return "White";
    else return "Black";
  }

  return (
    <div className={style.container}>
      <div className={style.turn}>{`Winner: ${winner}`}</div>
      <div className={style.board}>
        <div
          className={style.tiles}
          style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
        >
          {[...Array(size! * size!)].map((_, index) => (
            <DisplayTile
              key={`tile-${index}`}
              id={index}
              isSelected={moves.includes(index)}
              player={tileColor(index)}
              text={moves.indexOf(index)}
            />
          ))}
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/gameHistory");
        }}
      >
        Back
      </Button>
    </div>
  );
}
