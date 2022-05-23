import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import GameCard from "./GameCard";

export default function ShowGames() {
  return (
    <SimpleGrid minChildWidth="350px" spacing={2} maxH="95vh" overflowY="auto">
      <GameCard status="open" /> <GameCard status="open" /> <GameCard status="open" />{" "}
      <GameCard status="open" />
      <GameCard status="open" />
      <GameCard status="open" />
      <GameCard status="open" />
      <GameCard status="open" />
      <GameCard status="running" />
      <GameCard status="closed" />
    </SimpleGrid>
  );
}
