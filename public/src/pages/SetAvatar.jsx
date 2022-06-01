import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mais from "../assets/upload.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import { setAvatarRoute, getCurrentUserRoute } from "../utils/APIRoutes";
import Loader from "../components/Loader";
import {
  Avatar,
  Box,
  Button,
  Center,
  ChakraProvider,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";

import ".././App.css";
export default function SetAvatar() {
  const api = "https://api.multiavatar.com/Y3fZ4WT7dkaQz1";
  // falta usar a key
  const apiKey = "?apikey=Y3fZ4WT7dkaQz1";
  const [baseImage, setBaseImage] = useState(mais);
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [user, setUser] = useState([]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // useEffect(async () => {
  //     if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
  //         navigate("/login");
  // }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("user"));

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
        window.location.reload();
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    console.log(base64);
    avatars[avatars.length - 1] = base64;
    setBaseImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem("user")) {
        navigate("/login");
      }
      const data = [];
      const userLS = JSON.parse(localStorage.getItem("user"));
      const dados = await axios.get(`${getCurrentUserRoute}/${userLS._id}`);
      for (let i = 0; i < 3; i++) {
        const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
        console.log(image);

        const buffer = new Buffer(image.data);
        data.push("data:image/svg+xml;base64," + buffer.toString("base64"));
      }
      data.push(baseImage);
      setAvatars(data);
      setUser(dados.data);
      setIsLoading(false);
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ChakraProvider>
      {isLoading ? (
        <Center>
          {/* <img src={loader} alt="loader" className="loader" /> */}
          <Loader />
        </Center>
      ) : (
        <VStack mx="auto" h="100vh" justifyContent="center">
          <Box>
            <Heading textAlign="center">Olá {user.username}, seleciona uma foto de perfil!</Heading>
            <SimpleGrid
              pt="2vh"
              pb="2vh"
              display={["grid", null, "flex"]}
              spacing={["0", null, "2rem"]}
              columns={[1, null, 4]}
              justifyContent={"center"}
              alignItems="center"
            >
              {avatars.map((avatar, index) => {
                return (
                  // <div className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                  <Flex
                    padding="0.4rem"
                    borderRadius={"5rem"}
                    justifyContent="center"
                    alignItems="center"
                    key={index}
                    _hover={{
                      border: "0.4rem solid #00c6ff",
                    }}
                    transition="0.5s ease-in-out"
                    border={
                      selectedAvatar === index ? "0.4rem solid #0a72e7" : "0.4rem solid transparent"
                    }
                  >
                    {index === avatars.length - 1 ? (
                      <label htmlFor="file-input">
                        <Avatar
                          height={"6rem"}
                          width="6rem"
                          transition="0.5s ease-in-out"
                          src={avatar}
                          alt="avatar"
                          id={index}
                          onClick={() => setSelectedAvatar(index)}
                        />
                        <Input
                          display="none"
                          id="file-input"
                          type="file"
                          onChange={(e) => {
                            uploadImage(e);
                          }}
                        />
                      </label>
                    ) : (
                      <Avatar
                        width="6rem"
                        height={"6rem"}
                        src={avatar}
                        alt="avatar"
                        id={index}
                        _selected={{
                          border: "0.4rem solid #00c6ff",
                        }}
                        onClick={() => setSelectedAvatar(index)}
                      ></Avatar>
                    )}
                  </Flex>
                );
              })}
            </SimpleGrid>
            <Center>
              <Button
                fontWeight={"bold"}
                onClick={setProfilePicture}
                bg="#0a72e7"
                color={"white"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                  backgroundColor: "#4e0eff",
                }}
                type="submit"
              >
                Definir Imagem de Perfil
              </Button>
            </Center>
          </Box>
        </VStack>
      )}
      <ToastContainer />
    </ChakraProvider>
  );
}

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   gap: 3rem;
//   background-color: #131324;
//   height: 100vh;
//   width: 100vw;
//   .loader {
//     max-inline-size: 100%;
//   }
//   .title-container {
//     h1 {
//       color: white;
//     }
//   }
//   .displayImages {
//     max-width: 96px;
//     border-radius: 50%;
//   }
//   .displayFile {
//     display: none;
//   }
//   .avatars {
//     display: flex;
//     gap: 2rem;
//     .avatar {
//       border: 0.4rem solid transparent;
//       padding: 0.4rem;
//       border-radius: 5rem;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       transition: 0.5s ease-in-out;
//       img {
//         height: 6rem;
//         transition: 0.5s ease-in-out;
//       }
//       &:hover {
//         border: 0.4rem solid #00c6ff;
//       }
//     }
//     .selected {
//       border: 0.4rem solid #0a72e7;
//       &:hover {
//         border: 0.4rem solid #0a72e7;
//       }
//     }
//   }
//   .submit-btn {
//     background-color: #0a72e7;
//     color: white;
//     padding: 1rem 2rem;
//     border: none;
//     font-weight: bold;
//     cursor: pointer;
//     border-radius: 0.4rem;
//     font-size: 1rem;
//     text-transform: uppercase;
//     &:hover {
//       background-color: #4e0eff;
//     }
//   }
// `;
