import opentojoin from "../../assets/opentojoin.png";
import {
  Avatar,
  Box,
  Center,
  Flex,
  Stack,
  Button,
  useColorModeValue,
  Badge,
  VStack,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import User from "../CardComponents/User";
import { useNavigate } from "react-router-dom";

export default function GameOpen(props) {
  const navigate = useNavigate();
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
          <Badge fontSize={18} colorScheme="green">
            JOGO#{props.gameID}
          </Badge>
          <Badge ml="1" fontSize={18} colorScheme="green">
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
            <User player1Avatar={""} player1Username={"PROCURAR..."} />
          </Flex>

          <Box pb={5} pt={5}>
            <Button
              w={"full"}
              bg="#048918"
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              onClick={() => {
                navigate(`/game?room=${props.gameID}`);
                window.location.reload();
              }}
            >
              Entrar na partida
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
