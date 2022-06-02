import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { getCurrentUserRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Nav from "../components/Navbar";
import ShowGames from "../components/ShowGames";
import socket from "../context/socket";

export default function Chat() {
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
      setUser(data.data);
      socket.emit("connectUser", userLS.username, userLS._id);
      setIsLoading(false);
    }
    fetchData();
  }, []);
  const theme = extendTheme({
    config: {
      useSystemColorMode: true,
      initialColorMode: "dark",
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Nav image={user.image} username={user.username} id={user.id}></Nav>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ShowGames image={user.image} username={user.username} id={user.id} />
        </>
      )}
    </ChakraProvider>
  );
}
