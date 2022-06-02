import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { getCurrentUserRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ChakraProvider,
  extendTheme,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Nav from "../components/Navbar";
import socket from "../context/socket";
import TabelaUsers from "../components/TabelaUsers";
import { WarningIcon } from "@chakra-ui/icons";

export default function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem("user")) {
        navigate("/login");
      }
      const userLS = JSON.parse(localStorage.getItem("user"));
      const data = await axios.get(`${getCurrentUserRoute}/${userLS._id}`);
      if (data.data.isAdmin === false) {
        onOpen();
      }
      setUser(data.data);
      socket.emit("connectUser", userLS.username, userLS._id);
      setIsLoading(false);
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const theme = extendTheme({
    config: {
      useSystemColorMode: true,
      initialColorMode: "dark",
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider theme={theme}>
      <Modal
        closeOnOverlayClick={false}
        closeOnEsc={false}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size={"lg"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="2xl" fontWeight="bold" color="red.500">
              <WarningIcon mb="1" mr="2" />
              ERRO
            </Text>
          </ModalHeader>
          <ModalBody>
            <Text fontSize="xl" fontWeight="bold">
              Ups, parece que não tens permissão para ver isto!
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={async () => {
                navigate("/");
                window.location.reload();
              }}
            >
              Voltar a pagina Inicial
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Nav image={user.image} username={user.username} id={user.id}></Nav>
      {isLoading ? (
        <Loader />
      ) : (
        // <MatchHistoryTable image={user.image} username={user.username} userid={user.id} />
        <>{isOpen ? "" : <TabelaUsers id={user.id} />}</>
      )}
    </ChakraProvider>
  );
}
