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
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import socket from "../context/socket";
import { useState } from "react";

export default function Nav(props) {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const [onlineUsers, setOnlineUsers] = useState(0);

  socket.on("onlineUsers", (onlineUsers) => {
    setOnlineUsers(onlineUsers);
  });
  return (
    <>
      <Box bg={useColorModeValue("#0a72e7", "gray.900")} px={4} maxH="15vh">
        <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
          <Box
            onClick={() => {
              var currentPage = window.location.href;
              if (currentPage.includes("/game")) {
                alert(
                  "Tens a certeza que pretendes sair daqui? Se saires não poderas voltar e perderás o jogo!"
                );
              }
              navigate("/");
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
                  <MenuItem onClick={() => navigate("/setAvatar")}>
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
