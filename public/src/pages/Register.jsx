import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import TextField from "../components/TextField";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUnlock, faUser } from "@fortawesome/free-solid-svg-icons";
function Register() {
  const [show, setShow] = React.useState(false);
  const [showConfirmPassoword, setShowConfirmPassoword] = React.useState(false);

  const handleClick = () => setShow(!show);

  const handleClickConfirmPassword = () => setShowConfirmPassoword(!showConfirmPassoword);

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
    console.log("in validation", registerRoute);
    let { password, username, email } = values;
    email = email.toLowerCase();
    const { data } = await axios.post(registerRoute, {
      username,
      email,
      password,
    });
    console.log(data.password);
    //se os dados tiverem ok guardo a sessão no localStorage e vou para home page
    if (data.status === true) {
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/setAvatar");
    }
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
  }
  return (
    <>
      <ChakraProvider theme={theme}>
        <Formik
          initialValues={{ email: "", password: "", username: "", confirmPassword: "" }}
          validationSchema={Yup.object({
            username: Yup.string().min(
              6,
              "O seu nome de utilizador tem de ter pelo menos 6 caracteres"
            ),
            password: Yup.string().matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              "Precisa de ter pelo menos 8 caracteres, uma maiuscula, uma minuscula, um numero e um caracter especial"
            ),
            confirmPassword: Yup.string().oneOf(
              [Yup.ref("password"), null],
              "As palavras-passes não coincidem"
            ),
            // .equals("password", "As suas palavras-passes não coincidem"),

            email: Yup.string().email("Por favor, introduza um email válido."),
          })}
          onSubmit={(values, actions) => {
            // alert(JSON.stringify(values, null, 2));
            validateUser(values);
            console.log(actions);
            // actions.setFieldValue("password", "");
            // actions.setFieldValue("confirmPassword", "");
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
              autoComplete="off"
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
                    label="Nome de Utilizador"
                    values={formik.values.username}
                    leftElement={
                      <InputLeftElement
                        pointerEvents="none"
                        children={<FontAwesomeIcon size="1x" className="azul" icon={faUser} />}
                      />
                    }
                    fontWeight={"medium"}
                    id="username"
                    placeholder="Introduza o seu nome de utilizador"
                    type="username"
                    tabIndex={1}
                    name="username"
                  />

                  <TextField
                    label="Email"
                    values={formik.values.email}
                    leftElement={
                      <InputLeftElement
                        pointerEvents="none"
                        children={<FontAwesomeIcon size="1x" className="azul" icon={faEnvelope} />}
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
                    label="Palavra-Passe"
                    values={formik.values.password}
                    leftElement={
                      <InputLeftElement
                        pointerEvents="none"
                        children={<FontAwesomeIcon size="1x" className="azul" icon={faUnlock} />}
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

                  <TextField
                    label="Confirmar Palavra-Passe"
                    values={formik.values.password}
                    leftElement={
                      <InputLeftElement
                        pointerEvents="none"
                        children={<FontAwesomeIcon size="md" className="azul" icon={faLock} />}
                      />
                    }
                    rightElement={
                      <InputRightElement width="4rem">
                        <Button size="sm" onClick={handleClickConfirmPassword}>
                          {showConfirmPassoword ? <ViewOffIcon /> : <ViewIcon fontSize={"1.2em"} />}
                        </Button>
                      </InputRightElement>
                    }
                    fontWeight={"medium"}
                    id="confirmPassword"
                    placeholder="Confirme a sua palavra-passe"
                    type={showConfirmPassoword ? "text" : "password"}
                    tabIndex={1}
                    name="confirmPassword"
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
                  CRIAR CONTA
                </Button>
                <Center pt={5}>
                  <Flex alignContent="center">
                    <Text fontSize="md" fontWeight={"medium"}>
                      JÁ TENS CONTA?
                    </Text>
                    <Text fontSize="md" ml={"0.3rem"} fontWeight="bold" color="#00c6ff">
                      <Link to="/login">LOGIN</Link>
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
export default Register;
