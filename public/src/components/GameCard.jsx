import React from "react";
import GameClosed from "./lobbyStatus/GameClosed";
import GameCreate from "./lobbyStatus/GameCreate";
import GameOpen from "./lobbyStatus/GameOpen";
import GameRunning from "./lobbyStatus/GameRunning";

function GameCard(props) {
  return (
    <>
      {props.status === "open" ? (
        <GameOpen
          gameID={props.gameID}
          melhorde={props.melhorde}
          player1Username={props.player1Username}
          player1Avatar={props.player1Avatar}
        />
      ) : props.status === "running" ? (
        <GameRunning
          gameID={props.gameID}
          melhorde={props.melhorde}
          player1Avatar={props.player1Avatar}
          player1Username={props.player1Username}
          player2Avatar={props.player2Avatar}
          player2Username={props.player2Username}
          id={props.id}
        />
      ) : props.status === "closed" ? (
        <GameClosed />
      ) : (
        <GameCreate
          player1Avatar={props.player1Avatar}
          player1Username={props.player1Username}
          id={props.id}
        />
      )}
    </>
  );
}

export default GameCard;
