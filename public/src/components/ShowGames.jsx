import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import GameCard from "./GameCard";

export default function ShowGames(props) {
  return (
    <>
      <SimpleGrid minChildWidth="350px" spacing={2} maxH="95vh" overflowY="auto">
        <GameCard image={props.image} username={props.username} id={props.id} status="create" />
        <GameCard status="open" />
        <GameCard status="running" />
        <GameCard status="closed" />
        <GameCard status="closed" />
      </SimpleGrid>
    </>
  );
}
