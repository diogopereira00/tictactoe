import { Avatar, Badge, Box, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import React from "react";

function Scoreboard(props) {
  return (
    <Flex mt="2vh">
      <Box maxW="20%">
        <Avatar
          size={"xl"}
          src={props.player1Avatar}
          css={{
            border: "3px solid #0a72e7",
          }}
        ></Avatar>
        <Stack spacing={0} align={"center"} mt="7%">
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            {props.player1}
          </Text>
        </Stack>
      </Box>
      <Spacer />
      <Stack spacing={0} align={"center"} mt="7%">
        <Badge fontSize={24} colorScheme="default">
          {props.player1Score}
        </Badge>
      </Stack>
      <Spacer />
      <Stack spacing={0} align={"center"} mt="7%">
        <Badge fontSize={24} colorScheme="default">
          VS
        </Badge>
        <Badge fontSize={17} colorScheme="default">
          MELHOR DE {props.tipoJogo}
        </Badge>
      </Stack>
      <Spacer />
      <Stack spacing={0} align={"center"} mt="7%">
        <Badge fontSize={24} colorScheme="default">
          {props.player2Score}
        </Badge>
      </Stack>
      <Spacer />
      <Box maxW="20%">
        <Avatar
          size={"xl"}
          src={props.player2Avatar}
          css={{
            border: "3px solid #0a72e7",
          }}
        ></Avatar>
        <Stack spacing={0} align={"center"} mt="7%">
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            {props.player2}
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
}

export default Scoreboard;
