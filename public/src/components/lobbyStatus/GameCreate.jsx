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
} from "@chakra-ui/react";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function GameCreate(props) {
  const navigate = useNavigate();
  return (
    <>
      <Center py={3}>
        <Box
          maxW={"350px"}
          w={"full"}
          bg={useColorModeValue("white", "#00000076")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          {/* ==============
          USER QUE CRIOU
          ============== */}
          <Box pl={10} pr={10}>
            <Flex justify={"center"} mt={5}>
              <Box
                bg={useColorModeValue("white", "#303030a6")}
                borderRadius={5}
                pl={2}
                pr={2}
                pt={2}
              >
                <Avatar
                  m={2}
                  size={"xl"}
                  src={props.image}
                  alt={"Author"}
                  css={{
                    border: "3px solid #0a72e7",
                  }}
                />
                <Stack spacing={0} align={"center"} mb={2}>
                  <Badge fontSize={13} variant="subtle" mt={3} mb={3}>
                    {props.username}
                  </Badge>
                </Stack>
              </Box>
              <Box mt={14} borderRadius={5} ml={3} mr={3}>
                <Stack spacing={0} align={"center"}>
                  <Badge fontSize={20} colorScheme="default">
                    VS
                  </Badge>
                </Stack>
              </Box>

              <Box
                bg={useColorModeValue("white", "#303030a6")}
                borderRadius={5}
                pl={2}
                pr={2}
                pt={2}
              >
                <Avatar
                  m={2}
                  size={"xl"}
                  src={opentojoin}
                  alt={"Author"}
                  css={{
                    border: "3px solid #0a72e7",
                  }}
                />
                <Stack spacing={0} align={"center"}>
                  <Badge fontSize={13} variant="subtle" mt={3} mb={3}>
                    PROCURAR...
                  </Badge>
                </Stack>
              </Box>
            </Flex>
            <Box pb={5} pt={5}>
              <Button
                w={"full"}
                bg="#0a72e7"
                color={"white"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                onClick={() => {
                  navigate("/game");
                  window.location.reload();
                }}
              >
                Criar uma partida
              </Button>
            </Box>
          </Box>
        </Box>
      </Center>
    </>
  );
}
