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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Text,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tag,
  TagLabel,
  HStack,
  Switch,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../CardComponents/User";

export default function GameCreate(props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectGame, setSelectGame] = useState(undefined);
  const [partidaPrivada, setPartidaPrivada] = useState(false);

  return (
    <>
      <Modal closeOnOverlayClick={false} isCentered isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="2xl" fontWeight="bold">
              Começar um novo jogo
            </Text>
          </ModalHeader>
          <ModalBody>
            <Text fontSize="lg" fontWeight="bold">
              Que tipo de jogo pretendes jogar?
            </Text>
            <HStack pt="0.5vh" spacing="4">
              <Button
                borderRadius={"full"}
                colorScheme={selectGame === 1 ? "green" : "gray"}
                variant="solid"
                id="1"
                onClick={() => setSelectGame(1)}
              >
                MELHOR DE 1
              </Button>{" "}
              <Button
                borderRadius={"full"}
                colorScheme={selectGame === 3 ? "green" : "gray"}
                variant="solid"
                id="3"
                onClick={() => setSelectGame(3)}
              >
                MELHOR DE 3
              </Button>{" "}
              <Button
                borderRadius={"full"}
                colorScheme={selectGame === 5 ? "green" : "gray"}
                variant="solid"
                id="4"
                onClick={() => setSelectGame(5)}
              >
                MELHOR DE 5
              </Button>
            </HStack>
            <Text fontSize="lg" fontWeight="bold" pt="1.5vh">
              Partida privada?
              <Switch
                ml="2"
                colorScheme="green"
                id="partida-privada"
                size="lg"
                onChange={() => setPartidaPrivada(!partidaPrivada)}
              />
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                console.log(selectGame);
                console.log(partidaPrivada);
                localStorage.setItem(
                  "creategame",
                  JSON.stringify({ tipoJogo: selectGame, partidaPrivada: !partidaPrivada })
                );
                navigate("/game");
                window.location.reload();
              }}
            >
              Criar jogo
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
          <Badge fontSize={18} colorScheme="gray">
            CRIA AGORA UMA NOVA PARTIDA
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
              bg="#0a72e7"
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              onClick={() => {
                setSelectGame(undefined);
                setPartidaPrivada(false);
                onOpen();
                // navigate("/game");
                // window.location.reload();
              }}
            >
              Criar uma partida
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
