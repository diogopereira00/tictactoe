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
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function Nav(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Image maxW={14} src={logo} mr={5}></Image>
              <Heading as="h4" size="lg">
                TICTACTOE
              </Heading>
            </Flex>
          </Box>

          <Flex alignItems={"center"}>
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
