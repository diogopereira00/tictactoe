import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUser, faEnvelope, faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";

function RegisterOLD() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    //faz a validação
    if (handleValidation()) {
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
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // MUDAR VALIDAÇOES
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.warning("A palavra-passe não coincide com o confirmar palavra-passe.", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.warning("O username tem de ter mais de 3 caracteres.", toastOptions);
      return false;
    } else if (password.length < 2) {
      toast.warning("A palavra passe deve ter mais do que 8 caracteres.", toastOptions);
      return false;
    } else if (email === "") {
      toast.warning("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  return (
    <>
      <FormContainer>
        <form autoComplete="off" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="" />
            <h1>TicTacToe</h1>
          </div>
          <div>
            <label htmlFor="username">Nome de utilizador</label>
            <div
              htmlFor="username"
              tabIndex={0}
              className="inputGroup"
              onClick={() => {
                document.getElementById("username").focus();
              }}
            >
              <FontAwesomeIcon size="lg" className="azul" icon={faUser} />
              <input
                id="username"
                type="text"
                placeholder="Introduza o nome de utilizador"
                name="username"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <div
              tabIndex={1}
              className="inputGroup"
              onClick={() => {
                document.getElementById("email").focus();
              }}
            >
              <FontAwesomeIcon size="lg" styled="color: blue" icon={faEnvelope} />
              <input
                id="email"
                type="email"
                placeholder="Introduza o seu email"
                name="email"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password">Palavra-passe</label>
            <div
              tabIndex={2}
              className="inputGroup"
              onClick={() => {
                document.getElementById("password").focus();
              }}
            >
              <FontAwesomeIcon size="lg" className="azul" icon={faUnlock} />
              <input
                id="password"
                type="password"
                placeholder="Introduza a sua palavra-passe"
                name="password"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirmar Palavra-passe</label>
            <div
              tabIndex={3}
              className="inputGroup"
              onClick={() => {
                document.getElementById("confirmPassword").focus();
              }}
            >
              <FontAwesomeIcon size="lg" className="azul" icon={faLock} />
              <input
                id="confirmPassword"
                type="password"
                placeholder="Introduza a sua palavra-passe"
                name="confirmPassword"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <button type="submit">Criar Conta</button>
          <span className="centerAlready">
            Já tens conta?
            <Link to="/login">Login </Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  label {
    color: #ffffff;
  }

  .centerAlready {
    padding-left: 25%;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 28rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 3rem;
  }

  .inputGroup {
    background-color: transparent;
    padding: 1rem;
    border: 0.15rem solid #0a72e7;
    border-radius: 0.4rem;
    color: white;
    margin-top: 0.5rem;
    &:focus-within {
      border: 0.15rem solid #00c6ff;
      outline: none;
    }
  }
  input {
    background-color: transparent !important;
    color: white;
    padding-left: 1rem;
    width: 80%;
    font-size: 1rem;
    border: 0;
    &:focus {
      outline: none !important;
    }
  }

  button {
    background-color: #0a72e7;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #2a07ed;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    padding-left: 15%;
    a {
      margin-left: 5px;
      color: #00c6ff;
      text-decoration: none;
      font-weight: bold;
      &:hover {
        color: #0a72e7;
      }
    }
  }
  .azul {
    color: #0a72e7;
  }
`;

export default RegisterOLD;
