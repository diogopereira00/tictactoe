import React from "react";
import GameClosed from "./lobbyStatus/GameClosed";
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
      ) : null}
    </>
  );
}

export default GameCard;
