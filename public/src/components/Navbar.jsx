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
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, WarningIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import socket from "../context/socket";
import { useEffect, useState } from "react";
import axios from "axios";
import { leaverGameRoute } from "../utils/APIRoutes";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

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
                const { data } = await axios.post(`${leaverGameRoute}/${props.id}`);

                navigate(sairGame);
              }}
            >
              Sim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box bg={useColorModeValue("#0a72e7", "gray.900")} px={4} maxH="15vh">
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
                }
              } else {
                navigate("/");
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
              <Button onClick={toggleColorMode} mt={3}>
                {colorMode === "light" ? <MoonIcon boxSize={6} /> : <SunIcon boxSize={6} />}
              </Button>

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
                    <Heading as="h4" size="md" pt={2}>
                      {props.username}
                    </Heading>
                  </Flex>

                  <MenuDivider />
                  <MenuItem
                    onClick={() => {
                      var currentPage = window.location.href;
                      if (currentPage.includes("/game")) {
                        if (document.getElementById("partilhar") === null) {
                          setSairGame("/setAvatar");
                          onOpen();
                        }
                      } else {
                        navigate("/setAvatar");
                      }
                    }}
                  >
                    <Text fontSize="lg">Mudar o avatar</Text>
                  </MenuItem>
                  <MenuItem>
                    <Text fontSize="lg">Historico de Partidas</Text>
                  </MenuItem>
                  <MenuItem>
                    <Text fontSize="lg">Definições</Text>
                  </MenuItem>
                  <MenuItem>
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
