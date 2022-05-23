import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "../App.css";

import io from "socket.io-client";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  ChakraProvider,
  extendTheme,
  Input,
  Text,
  Heading,
} from "@chakra-ui/react";

import { RepeatIcon } from "@chakra-ui/icons";
const socket = io("http://localhost:5555");
function Teste2() {
  const [game, setGame] = useState(Array(9).fill(""));
  const [turnNumber, setTurnNumber] = useState(0);
  const [myTurn, setMyTurn] = useState(true);
  const [winner, setWinner] = useState(false);
  const [xo, setXO] = useState("X");
  const [player, setPlayer] = useState("");
  const [hasOpponent, setHasOpponent] = useState(false);
  const [share, setShare] = useState(false);
  const [turnData, setTurnData] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paramsRoom = params.get("room");
  const [room, setRoom] = useState(paramsRoom);

  const turn = (index) => {
    if (!game[index] && !winner && myTurn && hasOpponent) {
      socket.emit("reqTurn", JSON.stringify({ index, value: xo, room }));
    }
  };

  const sendRestart = () => {
    socket.emit("reqRestart", JSON.stringify({ room }));
  };

  const restart = () => {
    setGame(Array(9).fill(""));
    setWinner(false);
    setTurnNumber(0);
    setMyTurn(false);
  };

  useEffect(() => {
    combinations.forEach((c) => {
      if (game[c[0]] === game[c[1]] && game[c[0]] === game[c[2]] && game[c[0]] !== "") {
        setWinner(true);
      }
    });

    if (turnNumber === 0) {
      setMyTurn(xo === "X" ? true : false);
    }
  }, [game, turnNumber, xo]);

  useEffect(() => {
    socket.on("playerTurn", (json) => {
      setTurnData(json);
    });

    socket.on("restart", () => {
      restart();
    });

    socket.on("opponent_joined", () => {
      setHasOpponent(true);
      setShare(false);
    });
  }, []);

  useEffect(() => {
    if (turnData) {
      const data = JSON.parse(turnData);
      let g = [...game];
      if (!g[data.index] && !winner) {
        g[data.index] = data.value;
        setGame(g);
        setTurnNumber(turnNumber + 1);
        setTurnData(false);
        setMyTurn(!myTurn);
        setPlayer(data.value);
      }
    }
  }, [turnData, game, turnNumber, winner, myTurn]);

  useEffect(() => {
    if (paramsRoom) {
      // means you are player 2
      setXO("O");
      socket.emit("join", paramsRoom);
      setRoom(paramsRoom);
      setMyTurn(false);
    } else {
      // means you are player 1
      const newRoomName = random();
      socket.emit("create", newRoomName);
      setRoom(newRoomName);
      setMyTurn(true);
    }
  }, [paramsRoom]);
  const colors = {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  };
  const theme = extendTheme({ colors });

  return (
    <ChakraProvider theme={theme}>
      <Center mt="20vh">
        <Container>
          <Heading textAlign="center">Sala: #{room}</Heading>
          {winner === false ? (
            <>
              {hasOpponent ? (
                <Heading as="h3" size="lg" pt="2vh">
                  Turn: {myTurn ? "You" : "Opponent"}
                </Heading>
              ) : null}
            </>
          ) : null}
          {winner === false ? (
            <>
              {hasOpponent ? null : (
                <Heading as="h4" size="md" pt="2vh">
                  A espera de adversario...
                </Heading>
              )}
            </>
          ) : null}
          <Center pt="2vh">
            <Box w={"100vw"} textAlign="center">
              {winner ? (
                <Heading as="h4" size="lg">
                  Vencedor: {player}!
                </Heading>
              ) : turnNumber === 9 ? (
                <Heading as="h4" size="lg">
                  Empate!
                </Heading>
              ) : (
                <br />
              )}
              {winner || turnNumber === 9 ? (
                <Box pt="5" pb="5">
                  <Button
                    leftIcon={<RepeatIcon />}
                    onClick={sendRestart}
                    w="80%"
                    colorScheme="linkedin"
                    rounded={"md"}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                    fontSize={22}
                  >
                    Repetir
                  </Button>
                </Box>
              ) : null}
            </Box>
          </Center>

          <Flex>
            <Area index={0} turn={turn} value={game[0]} />
            <Area index={1} turn={turn} value={game[1]} />
            <Area index={2} turn={turn} value={game[2]} />
          </Flex>
          <Flex>
            <Area index={3} turn={turn} value={game[3]} />
            <Area index={4} turn={turn} value={game[4]} />
            <Area index={5} turn={turn} value={game[5]} />
          </Flex>
          <Flex>
            <Area index={6} turn={turn} value={game[6]} />
            <Area index={7} turn={turn} value={game[7]} />
            <Area index={8} turn={turn} value={game[8]} />
          </Flex>
          <Flex pb={5} pt={5}>
            <Button
              onClick={() => setShare(!share)}
              w={"full"}
              bg="#048918"
              color={"white"}
              rounded={"md"}
              maxW="30%"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              mr={2}
              fontSize={22}
            >
              Partilhar
            </Button>
            {share ? (
              <>
                <Input type="text" value={`${window.location.href}?room=${room}`} readOnly />
              </>
            ) : (
              <Input type="text" value={``} readOnly />
            )}
          </Flex>
        </Container>
      </Center>
    </ChakraProvider>
  );
}

const Area = ({ index, turn, value }) => {
  return (
    <>
      {index === 0 ? (
        <Box
          w="10rem"
          h="10rem"
          borderBottom="5px solid  #0a72e7;"
          textAlign="center"
          lineHeight="8.5rem"
          fontSize="8rem"
          fontWeight="bold"
          mt="-1px"
          onClick={() => turn(index)}
        >
          {value}
        </Box>
      ) : null}
      {index === 1 ? (
        <Box
          w="10rem"
          h="10rem"
          borderLeft="5px solid  #0a72e7;"
          borderRight="5px solid  #0a72e7;"
          borderBottom="5px solid  #0a72e7;"
          textAlign="center"
          lineHeight="8.5rem"
          fontSize="8rem"
          fontWeight="bold"
          mt="-1px"
          onClick={() => turn(index)}
        >
          {value}
        </Box>
      ) : null}
      {index === 2 ? (
        <Box
          w="10rem"
          h="10rem"
          borderBottom="5px solid  #0a72e7;"
          textAlign="center"
          lineHeight="8.5rem"
          fontSize="8rem"
          fontWeight="bold"
          mt="-1px"
          onClick={() => turn(index)}
        >
          {value}
        </Box>
      ) : null}
      {index === 3 ? (
        <Box
          w="10rem"
          h="10rem"
          borderBottom="5px solid  #0a72e7;"
          textAlign="center"
          lineHeight="8.5rem"
          fontSize="8rem"
          fontWeight="bold"
          mt="-1px"
          onClick={() => turn(index)}
        >
          {value}
        </Box>
      ) : null}
      {index === 4 ? (
        <Box
          w="10rem"
          h="10rem"
          borderRight="5px solid  #0a72e7;"
          borderLeft="5px solid  #0a72e7;"
          borderBottom="5px solid  #0a72e7;"
          textAlign="center"
          lineHeight="8.5rem"
          fontSize="8rem"
          fontWeight="bold"
          mt="-1px"
          onClick={() => turn(index)}
        >
          {value}
        </Box>
      ) : null}
      {index === 5 ? (
        <Box
          w="10rem"
          h="10rem"
          borderBottom="5px solid  #0a72e7;"
          textAlign="center"
          lineHeight="8.5rem"
          fontSize="8rem"
          fontWeight="bold"
          mt="-1px"
          onClick={() => turn(index)}
        >
          {value}
        </Box>
      ) : null}
      {index === 6 ? (
        <Box
          w="10rem"
          h="10rem"
          textAlign="center"
          lineHeight="8.5rem"
          fontSize="8rem"
          fontWeight="bold"
          mt="-1px"
          onClick={() => turn(index)}
        >
          {value}
        </Box>
      ) : null}
      {index === 7 ? (
        <Box
          w="10rem"
          h="10rem"
          borderRight="5px solid  #0a72e7;"
          borderLeft="5px solid  #0a72e7;"
          textAlign="center"
          lineHeight="8.5rem"
          fontSize="8rem"
          fontWeight="bold"
          mt="-1px"
          onClick={() => turn(index)}
        >
          {value}
        </Box>
      ) : null}
      {index === 8 ? (
        <Box
          w="10rem"
          h="10rem"
          textAlign="center"
          lineHeight="8.5rem"
          fontSize="8rem"
          fontWeight="bold"
          mt="-1px"
          onClick={() => turn(index)}
        >
          {value}
        </Box>
      ) : null}
    </>
  );
};

const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const random = () => {
  return Array.from(Array(8), () => Math.floor(Math.random() * 36).toString(36)).join("");
};

export default Teste2;
