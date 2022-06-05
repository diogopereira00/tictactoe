import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { getAllPublicOpenGamesRoute, getCurrentUserRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Nav from "../components/Navbar";
import ShowGames from "../components/ShowGames";
import socket from "../context/socket";

export default function Chat() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem("user")) {
        navigate("/login");
      }
      const userLS = JSON.parse(localStorage.getItem("user"));
      const data = await axios.get(`${getCurrentUserRoute}/${userLS._id}`);
      setUser(data.data);
      socket.emit("connectUser", userLS.username, userLS._id);
    }
    fetchData();
  }, []);
  const theme = extendTheme({
    config: {
      useSystemColorMode: true,
      initialColorMode: "dark",
    },
  });
  async function fetchData() {
    var todosJogos = await (await axios.get(`${getAllPublicOpenGamesRoute}`)).data.game;
    for (let i = 0; i < todosJogos.length; i++) {
      const element = todosJogos[i];
      const p1 = await axios.get(`${getCurrentUserRoute}/${element.player1}`);
      console.log(p1);
      element.player1Username = p1.data.username;
      element.player1Avatar = p1.data.image;
      if (element.status === "running") {
        const adversario = await axios.get(`${getCurrentUserRoute}/${element.player2}`);
        element.player2Username = adversario.data.username;
        element.player2Avatar = adversario.data.image;
      }
    }
    setGames(todosJogos);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();

    socket.on("refreshJogos", () => {
      fetchData();
    });
    // const interval = setInterval(() => {
    //   fetchData();
    // }, 10000);

    // return () => clearInterval(interval);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Nav image={user.image} username={user.username} id={user.id}></Nav>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ShowGames games={games} image={user.image} username={user.username} id={user.id} />
        </>
      )}
    </ChakraProvider>
  );
}
