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

export default function GameOpen() {
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
                  src={
                    "https://media-exp1.licdn.com/dms/image/C4E03AQHmZt7x_3pYQg/profile-displayphoto-shrink_800_800/0/1633035509100?e=1658361600&v=beta&t=FcmgTMiB0lsmLvnh9doCF43Bqrqtg01_iU1NJZNwKDU"
                  }
                  alt={"Author"}
                  css={{
                    border: "3px solid #0a72e7",
                  }}
                />
                <Stack spacing={0} align={"center"} mb={2}>
                  <Badge fontSize={13} variant="subtle" mt={3} mb={3}>
                    Daniel Dias
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
                {" "}
                <Avatar
                  m={2}
                  size={"xl"}
                  src={opentojoin}
                  alt={"Oponente"}
                  css={{
                    border: "3px solid #048918",
                  }}
                />
                <Stack spacing={0} align={"center"}>
                  <Badge colorScheme="green" variant="solid" mt={3} mb={3}>
                    ABERTO
                  </Badge>
                </Stack>
              </Box>
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
              >
                Entrar na partida
              </Button>
            </Box>
          </Box>
        </Box>
      </Center>
    </>
  );
}
