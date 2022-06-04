import {
  Avatar,
  Box,
  Center,
  Flex,
  Stack,
  Button,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import React from "react";
import User from "../CardComponents/User";

export default function GameRunning(props) {
  return (
    <>
      <Box
        mt={3}
        maxW={"350px"}
        w={"full"}
        bg={useColorModeValue("white", "#00000076")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Center pt={5} spacing={1} align={"center"}>
          <Badge fontSize={18} colorScheme="orange">
            JOGO#{props.gameID}
          </Badge>
          <Badge ml="1" fontSize={18} colorScheme="orange">
            MELHOR DE {props.melhorde}
          </Badge>
        </Center>
        {/* ==============
          USER QUE CRIOU
          ============== */}
        <Box pl={10} pr={10}>
          <Flex justify={"center"} mt={5}>
            <User player1Avatar={props.player1Avatar} player1Username={props.player1Username} />
            <Box mt={14} borderRadius={5} ml={3} mr={3}>
              <Stack spacing={0} align={"center"}>
                <Badge fontSize={20} colorScheme="default">
                  VS
                </Badge>
              </Stack>
            </Box>
            <User player1Avatar={props.player2Avatar} player1Username={props.player2Username} />
          </Flex>
          <Box pb={5} pt={5}>
            <Button
              isLoading
              loadingText="Em andamento..."
              w={"full"}
              bg="#e2ce28"
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Em andamento{" "}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
