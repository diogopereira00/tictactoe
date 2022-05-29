import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

import {
  Box,
  Button,
  Center,
  ChakraProvider,
  extendTheme,
  Flex,
  Heading,
  Image,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Formik } from "formik";
import logo from "../assets/logo.png";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import TextField from "../components/TextField";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    closeOnClick: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const colors = {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  };
  const theme = extendTheme({ colors });

  async function validateUser(values) {
    console.log("in validation", loginRoute);
    let { email, password } = values;
    email = email.toLowerCase();
    const { data } = await axios.post(loginRoute, {
      email,
      password,
    });
    if (data.status === true) {
      delete data.password;
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    }
    if (data.status === false) {
      // toast.error(data.msg, toastOptions);
      toast.error(data.msg, toastOptions);
    }
  }
  return (
    <>
      <ChakraProvider theme={theme}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            password: Yup.string().required("Precisa de introduzir uma palavra-passe"),
            email: Yup.string()
              .email("Por favor, introduza um email válido.")
              .required("Precisa de introduzir um email."),
          })}
          onSubmit={(values, actions) => {
            // alert(JSON.stringify(values, null, 2));
            validateUser(values);
            console.log(actions);
            actions.setFieldValue("password", "");
          }}
        >
          {(formik) => (
            <VStack
              as="form"
              mx="auto"
              w={{ base: "90%", md: 500 }}
              h="100vh"
              justifyContent="center"
              onSubmit={formik.handleSubmit}
            >
              <Box
                width="28rem"
                backgroundColor="#00000076"
                borderRadius="2rem"
                padding="3rem 3rem"
              >
                <Center pb={7}>
                  <Flex>
                    <Image maxH={"5rem"} src={logo} mr={5}></Image>
                    <Heading as="h4" size="xl" color="white" alignSelf={"center"}>
                      TICTACTOE
                    </Heading>
                  </Flex>
                </Center>
                <Box pb={7}>
                  <TextField
                    label="Email"
                    values={formik.values.email}
                    leftElement={
                      <InputLeftElement
                        pointerEvents="none"
                        children={<EmailIcon fontSize={"1.2em"} color="blue.400" />}
                      />
                    }
                    fontWeight={"medium"}
                    id="email"
                    placeholder="Introduza o seu email"
                    type="email"
                    tabIndex={1}
                    name="email"
                  />

                  <TextField
                    label="Palavra-passe"
                    values={formik.values.password}
                    leftElement={
                      <InputLeftElement
                        pointerEvents="none"
                        children={<LockIcon fontSize={"1.2em"} color="blue.400" />}
                      />
                    }
                    rightElement={
                      <InputRightElement width="4rem">
                        <Button size="sm" onClick={handleClick}>
                          {show ? <ViewOffIcon /> : <ViewIcon fontSize={"1.2em"} />}
                        </Button>
                      </InputRightElement>
                    }
                    fontWeight={"medium"}
                    id="password"
                    placeholder="Introduza a sua palavra-passe"
                    type={show ? "text" : "password"}
                    tabIndex={1}
                    name="password"
                  />
                </Box>

                <Button
                  w={"full"}
                  bg="#0a72e7"
                  color={"white"}
                  rounded={"md"}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  type="submit"
                >
                  INICIAR SESSÃO
                </Button>
                <Center pt={5}>
                  <Flex alignContent="center">
                    <Text fontSize="md" fontWeight={"medium"}>
                      NÃO TENS CONTA?
                    </Text>
                    <Text fontSize="md" ml={"0.3rem"} fontWeight="bold" color="#00c6ff">
                      <Link to="/register">REGISTA-TE</Link>
                    </Text>
                  </Flex>
                </Center>
              </Box>
            </VStack>
          )}
        </Formik>
      </ChakraProvider>
      <ToastContainer />
    </>
  );
}
