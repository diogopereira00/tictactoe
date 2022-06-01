import React from "react";
import GameClosed from "./lobbyStatus/GameClosed";
import GameCreate from "./lobbyStatus/GameCreate";
import GameOpen from "./lobbyStatus/GameOpen";
import GameRunning from "./lobbyStatus/GameRunning";

function GameCard(props) {
  return (
    <>
      {props.status === "open" ? (
        <GameOpen />
      ) : props.status === "running" ? (
        <GameRunning />
      ) : props.status === "closed" ? (
        <GameClosed />
      ) : (
        <GameCreate image={props.image} username={props.username} id={props.id} />
      )}
    </>
  );
}

export default GameCard;
