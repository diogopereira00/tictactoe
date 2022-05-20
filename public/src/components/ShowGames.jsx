import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import GameCard from "./GameCard";

export default function ShowGames() {
  return (
    <SimpleGrid minChildWidth="335px">
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
