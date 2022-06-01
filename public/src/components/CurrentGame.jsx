import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "../App.css";
import user from "../assets/user.png";

import {
  Box,
  Flex,
  Button,
  Heading,
  Text,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  Container,
  ChakraProvider,
  extendTheme,
  Input,
  Alert,
  Spinner,
  Spacer,
  useToast,
} from "@chakra-ui/react";

import { CopyIcon, RepeatIcon, WarningTwoIcon } from "@chakra-ui/icons";
import axios from "axios";
import {
  createGameRoute,
  getCurrentRoomRoute,
  joinRoomRoute,
  leaverGameRoute,
} from "../utils/APIRoutes";
import Scoreboard from "./Scoreboard";
import socket from "../context/socket";
function CurrentGame(props) {
  socket.emit("connectUser", props.creator.username, props.creator.id);
  const navigate = useNavigate();

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

  const [tipoJogo, setTipoJogo] = useState([]);
  const [player1ID, setPlayer1ID] = useState([]);
  const [player2ID, setPlayer2ID] = useState([]);

  const [player1Username, setPlayer1Username] = useState([]);
  const [player1Avatar, setPlayer1Avatar] = useState([]);

  const [player2Username, setPlayer2Username] = useState([]);
  const [player2Avatar, setPlayer2Avatar] = useState([]);

  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [lastWinner, setLastWinner] = useState("X");
  const [houveEmpate, setHouveEmpate] = useState(false);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenErrorJoin,
    onOpen: onOpenErrorJoin,
    onClose: onCloseErrorJoin,
  } = useDisclosure();

  var testePlayer2 = "";
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
      //verifica em cada jogada se há vencedor
      if (game[c[0]] === game[c[1]] && game[c[0]] === game[c[2]] && game[c[0]] !== "") {
        setWinner(true);
        setHouveEmpate(false);
        console.log(player);
        if (player === "X") {
          setPlayer1Score(player1Score + 1);
        } else if (player === "O") {
          setPlayer2Score(player2Score + 1);
        }
        setLastWinner(player);
      }
      //se nao houver vencedor e se for a jogada 9 entao
      else if (turnNumber === 9) {
        setHouveEmpate(true);
      }
    });
    //se for a jogada 0
    if (turnNumber === 0) {
      //verifica se houve empate
      if (houveEmpate) {
        setMyTurn(xo === lastWinner ? false : true);
        setLastWinner(lastWinner === "X" ? "O" : "X");
      } else {
        setMyTurn(xo === lastWinner ? true : false);
      }
      //  else {
      //   if (houveEmpate) {
      //     setMyTurn(xo === "X" ? false : true);
      //   } else {
      //     setMyTurn(xo === "X" ? true : false);
      //   }
      // }
    }
  }, [game, turnNumber, xo]);

  useEffect(() => {
    socket.on("playerTurn", (json) => {
      setTurnData(json);
    });

    socket.on("restart", () => {
      restart();
    });

    socket.on("opponent_joined", (player2, player2Avatar, player2ID) => {
      setPlayer2Username(player2);
      setPlayer2Avatar(player2Avatar);
      setPlayer2ID(player2ID);
      testePlayer2 = player2ID;
      // alert(player2ID);

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
    async function fetchData() {
      if (paramsRoom) {
        // means you are player 2
        console.log(paramsRoom);

        //verifica o segundo player
        const { data } = await axios.post(`${joinRoomRoute}/${paramsRoom}`, {
          player2: props.creator.id,
        });
        if (data.status === true) {
          setTipoJogo(data.game.melhorde);
          setPlayer1Username(data.game.player1.username);
          setPlayer1Avatar(data.game.player1.avatar);
          setPlayer1ID(data.game.player1.id);

          setPlayer2Username(data.game.player2.username);
          setPlayer2Avatar(data.game.player2.avatar);
          setPlayer2ID(data.game.player2.id);

          setXO("O");
          const sala = {
            sala: paramsRoom,
            player2: data.game.player2.username,
            player2Avatar: data.game.player2.avatar,
            player2ID: data.game.player2.id,
          };
          socket.emit("join", sala);
          setRoom(paramsRoom);
          setMyTurn(false);
        } else {
          onOpenErrorJoin();
        }
      } else {
        // means you are player 1
        const newRoomName = random();
        const melhorde = await JSON.parse(localStorage.getItem("creategame"));
        console.log(melhorde.tipoJogo);
        //verificar se o player ja tem um jogo aberto, se tiver entra nesse
        const { data } = await axios.post(createGameRoute, {
          gameID: newRoomName,
          player1: props.creator.id,
          melhorde: melhorde.tipoJogo,
          public: !melhorde.partidaPrivada,
        });
        localStorage.removeItem("creategame");
        const roomName = data.game.gameID;
        if (data.status === true) {
          setPlayer1Username(data.game.player1.username);
          setPlayer1ID(data.game.player1.id);
          setPlayer2ID("");
          setPlayer2Username("A aguardar adversario...");
          setTipoJogo(data.game.melhorde);

          setPlayer1Avatar(data.game.player1.avatar);
          setPlayer2Avatar(user);
          socket.emit("create", roomName);
          setRoom(roomName);
          setMyTurn(true);
        } else {
          fetchData();
        }
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (room != null) {
      console.log("sala..." + room);

      socket.once("leaverGame", async (idUserLeaver) => {
        const dados = await axios.get(`${getCurrentRoomRoute}/${room}`);
        console.log(dados);
        if (idUserLeaver === dados.data.game.player1) {
          await axios.post(`${leaverGameRoute}/${dados.data.game.player1}`);

          onOpen();
        }
        if (idUserLeaver === dados.data.game.player2) {
          await axios.post(`${leaverGameRoute}/${dados.data.game.player2}`);

          onOpen();
        }
      });
    }
  });

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
      {/* MODAL ERRO, JOGO CHEIO */}
      <Modal
        closeOnOverlayClick={false}
        isCentered
        isOpen={isOpenErrorJoin}
        onClose={onCloseErrorJoin}
        size={"lg"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="2xl" fontWeight="bold" color="red.500">
              <WarningTwoIcon mb="1" mr="2" />
              ERRO!
            </Text>
          </ModalHeader>
          <ModalBody>
            <Text fontSize="xl" fontWeight="bold">
              Ups. Parece que esta sala já está cheia.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                navigate("/");
                window.location.reload();
              }}
            >
              Voltar ao lobby
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* MODAL UTILIZADOR SAIU, GANHASTE O JOGO */}
      <Modal closeOnOverlayClick={false} isCentered isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="2xl" fontWeight="bold" color="yellow.500">
              Parabéns!
            </Text>
          </ModalHeader>
          <ModalBody>
            <Text fontSize="xl" fontWeight="bold">
              Vences-te o jogo! O {player2Username} abandonou a partida.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                navigate("/");
                window.location.reload();
              }}
            >
              Voltar ao lobby
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Center mt="3vh">
        <Container>
          <Text fontSize="3xl" fontWeight="bold" textAlign="center">
            <Badge ml="1" fontSize="0.95em" mb="4px" colorScheme={"blue"}>
              Jogo#{room}
            </Badge>
          </Text>
          <Scoreboard
            tipoJogo={tipoJogo}
            player1={player1Username}
            player1Avatar={player1Avatar}
            player2={player2Username}
            player2Avatar={player2Avatar}
            player1Score={player1Score}
            player2Score={player2Score}
          ></Scoreboard>
          {winner === false ? (
            <>
              {hasOpponent ? (
                <>
                  {turnNumber === 9 ? (
                    ""
                  ) : (
                    <>
                      <Center>
                        {props.creator.id === player1ID ? (
                          <>
                            <Heading as="h3" size="xl" pt="1vh">
                              {myTurn ? (
                                <Alert status="success">{player1Username} é a tua vez</Alert>
                              ) : (
                                <>
                                  <Alert status="warning">
                                    <Spinner mr="0.5vw" />A espera de {player2Username}
                                  </Alert>
                                </>
                              )}
                            </Heading>
                          </>
                        ) : (
                          <>
                            <Heading as="h3" size="lg" pt="1vh">
                              {myTurn ? (
                                <Alert status="success">{player2Username} é a tua vez</Alert>
                              ) : (
                                <>
                                  <Alert status="warning">
                                    <Spinner mr="0.5vw" />
                                    <Spacer /> A espera de {player1Username}...
                                  </Alert>
                                </>
                              )}
                            </Heading>
                          </>
                        )}
                      </Center>
                    </>
                  )}
                </>
              ) : null}
            </>
          ) : null}
          <>
            {hasOpponent ? null : (
              <>
                <Flex pt={5}>
                  <Button
                    onClick={() => {
                      setShare(!share);
                      var c = document.getElementById("inputgame");
                      c.select();
                      document.execCommand("copy");
                      window.getSelection().removeAllRanges();
                      toast({
                        title: "Link copiado",
                        position: "bottom",
                        description: "Já podes partilhar o link!",
                        status: "info",
                        duration: 1500,
                        isClosable: true,
                      });
                      c.selected = false;
                    }}
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
                    id="partilhar"
                  >
                    <CopyIcon /> Partilhar
                  </Button>
                  <>
                    <Input
                      id="inputgame"
                      type="text"
                      value={`${window.location.href}?room=${room}`}
                      readOnly
                    />
                  </>
                </Flex>
              </>
            )}
          </>
          <Box textAlign="center">
            {winner ? (
              <Center>
                <Heading as="h3" size="lg" pt="1vh">
                  <>
                    {player === "X" ? (
                      <Alert status="success">Vencedor: {player1Username}!</Alert>
                    ) : (
                      <Alert status="success">Vencedor: {player2Username}!</Alert>
                    )}
                  </>
                  {/* Vencedor: {player}! */}
                </Heading>
              </Center>
            ) : turnNumber === 9 ? (
              <Center>
                <Heading as="h3" size="lg" pt="1vh">
                  <Alert status="warning">Empate!</Alert>
                </Heading>
              </Center>
            ) : null}
            {winner || turnNumber === 9 ? (
              <Box pt="5">
                <Button
                  leftIcon={<RepeatIcon />}
                  onClick={sendRestart}
                  colorScheme="blue"
                  rounded={"md"}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  fontSize={22}
                  fontWeight="bold"
                >
                  Jogar novamente
                </Button>
              </Box>
            ) : null}
          </Box>
          <Box pt={6} pb={5}>
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
          </Box>
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

export default CurrentGame;
