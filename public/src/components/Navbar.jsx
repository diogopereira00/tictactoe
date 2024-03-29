import logo from "../assets/logo.png";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Heading,
  Image,
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
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, WarningIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import socket from "../context/socket";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUserRoute } from "../utils/APIRoutes";

export default function Nav(props) {
  const navigate = useNavigate();
  const [sairGame, setSairGame] = useState(undefined);
  const { colorMode, toggleColorMode } = useColorMode();
  const [onlineUsers, setOnlineUsers] = useState(0);
  useEffect(() => {
    socket.on("onlineUsers", (onlineUsers) => {
      setOnlineUsers(onlineUsers);
    });
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    async function fetchData() {
      const userLS = JSON.parse(localStorage.getItem("user"));
      const data = await axios.get(`${getCurrentUserRoute}/${userLS._id}`);
      // console.log(data.data);
      setIsAdmin(data.data.isAdmin);
    }
    fetchData();
  }, []);
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="2xl" fontWeight="bold" color="yellow.500">
              <WarningIcon mb="1" mr="2" />
              Tens a certeza?
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="xl" fontWeight="bold">
              Se abandonares a partida, vais perder o jogo!{" "}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="blue"
              onClick={async () => {
                navigate(sairGame);
                window.location.reload();
              }}
            >
              Sim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box bg={useColorModeValue("#0a72e7", "gray.900")} px={4} maxW="100vw">
        <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
          <Box
            onClick={async () => {
              var currentPage = window.location.href;
              if (currentPage.includes("/game")) {
                //o jogo ja está a correr se o elemento "partilhar" nao existir
                if (document.getElementById("partilhar") === null) {
                  setSairGame("/");

                  onOpen();
                } else {
                  navigate("/");
                  window.location.reload();
                }
              } else {
                navigate("/");
                window.location.reload();
              }
            }}
            cursor="pointer"
          >
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Image maxW={14} src={logo} mr={5}></Image>
              <Heading as="h4" size="lg" color="white">
                TICTACTOE
              </Heading>
            </Flex>
          </Box>

          <Flex alignItems={"center"}>
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              <Badge ml="1" fontSize="0.75em" mr="1vw" colorScheme={"green"}>
                {onlineUsers} online
              </Badge>
            </Text>
            <Stack direction={"row"} spacing={7}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"lg"}
                    src={props.image}
                    css={{
                      border: "3px solid #0a72e7",
                    }}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <Flex ml={4}>
                    <Avatar size={"md"} src={props.image} mr={4} />
                    <Heading as="h4" size="md" pt={2.5}>
                      {props.username}
                    </Heading>
                  </Flex>

                  <MenuDivider />
                  <MenuItem justifyContent="center" onClick={toggleColorMode}>
                    {colorMode === "light" ? (
                      <>
                        <MoonIcon boxSize={6} pr={2} /> Tema Escuro
                      </>
                    ) : (
                      <>
                        <SunIcon boxSize={6} pr={2} /> Tema Claro
                      </>
                    )}
                  </MenuItem>
                  <MenuDivider />
                  <Center mb="0" pb="0">
                    <Badge
                      display={isAdmin ? "revert" : "none"}
                      colorScheme={"red"}
                      justifyContent="center"
                    >
                      Menu Admin
                    </Badge>
                  </Center>
                  <MenuItem
                    display={isAdmin ? "revert" : "none"}
                    onClick={() => {
                      var currentPage = window.location.href;
                      if (currentPage.includes("/game")) {
                        if (document.getElementById("partilhar") === null) {
                          setSairGame("/users");
                          onOpen();
                        } else {
                          navigate("/users");
                          window.location.reload();
                        }
                      } else {
                        navigate("/users");
                        window.location.reload();
                      }
                    }}
                  >
                    <Text fontSize="lg" display={isAdmin ? "revert" : "none"}>
                      Gerir Utilizadores
                    </Text>
                  </MenuItem>
                  <MenuDivider display={isAdmin ? "revert" : "none"} />

                  <MenuItem
                    onClick={() => {
                      var currentPage = window.location.href;
                      if (currentPage.includes("/game")) {
                        if (document.getElementById("partilhar") === null) {
                          setSairGame("/setAvatar");
                          onOpen();
                        } else {
                          navigate("/setAvatar");
                        }
                      } else {
                        navigate("/setAvatar");
                      }
                    }}
                  >
                    <Text fontSize="lg">Mudar o avatar</Text>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      var currentPage = window.location.href;
                      if (currentPage.includes("/game")) {
                        console.log("aqui");
                        if (document.getElementById("partilhar") === null) {
                          setSairGame("/matchHistory");
                          onOpen();
                        } else {
                          navigate("/matchHistory");
                          window.location.reload();
                        }
                      } else {
                        navigate("/matchHistory");
                        window.location.reload();
                      }
                    }}
                  >
                    <Text fontSize="lg">Historico de Partidas</Text>
                  </MenuItem>
                  <MenuItem>
                    <Text fontSize="lg">Definições</Text>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      localStorage.removeItem("user");
                      window.location.reload();
                    }}
                  >
                    <Text fontSize="lg">Terminar sessão</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
