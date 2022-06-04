import { SimpleGrid, Wrap } from "@chakra-ui/react";
import React, { useState } from "react";
import GameCard from "./GameCard";

export default function ShowGames(props) {
  // const [games, setGames] = useState([]);
  // setGames(props.games);
  console.log(props.games);
  return (
    <>
      <Wrap
        ml={["6vw", "5vw", "2vw"]}
        mr={["6vw", "5vw", "2vw"]}
        minChildWidth="350px"
        spacing={5}
        mt={5}
      >
        <GameCard
          player1Username={props.username}
          player1Avatar={props.image}
          id={props.id}
          status="create"
        />
        {props.games.map((item: any, index: number) => {
          return (
            <>
              <GameCard
                gameID={item.gameID}
                status={item.status}
                melhorde={item.melhorde}
                player1Username={item.player1Username}
                player1Avatar={item.player1Avatar}
                player2Username={item.player2Username}
                player2Avatar={item.player2Avatar}
              />
            </>
          );
        })}
      </Wrap>
    </>
  );
}
