import CurrentGame from "../components/CurrentGame";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { getCurrentUserRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Nav from "../components/Navbar";
function Game() {
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
      // console.log("dados user : " + data.image);
      setUser(data.data);
      // console.log("user:" + user._id);
      setIsLoading(false);
    }
    fetchData();
  }, []);
  const colors = {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  };
  const theme = extendTheme({ colors });

  return (
    <ChakraProvider theme={theme}>
      <Nav image={user.image} username={user.username} id={user.id}></Nav>
      {/* nao posso passar o currentUser para o currentGame creater */}
      {isLoading ? <Loader /> : <CurrentGame creator={user} />}
    </ChakraProvider>
  );
}

export default Game;
