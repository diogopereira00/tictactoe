import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

function Login() {
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
    password: "",
  });

  const handleSubmit = async event => {
    event.preventDefault();
    if (handleValidation()) {
      console.log("in validation", loginRoute);
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === true) {
        delete data.password;
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      }
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
    }
  };
  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // MUDAR VALIDAÇOES
  const handleValidation = () => {
    const { password, username } = values;
    if (username === "" || password === "") {
      toast.warning(
        "Precisa de introduzir um username e uma password",
        toastOptions
      );
      return false;
    }

    return true;
  };

  return (
    <>
      <FormContainer>
        <form autoComplete="off" onSubmit={event => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="" />
            <h1>TicTacToe</h1>
          </div>
          <div>
            <label htmlFor="username">Nome de utilizador</label>
            <div tabIndex={0} className="inputGroup">
              <FontAwesomeIcon size="lg" className="azul" icon={faUser} />
              <input
                type="text"
                placeholder="Introduza o nome de utilizador"
                name="username"
                onChange={e => handleChange(e)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password">Palavra-passe</label>
            <div tabIndex={2} className="inputGroup">
              <FontAwesomeIcon size="lg" className="azul" icon={faLock} />
              <input
                type="password"
                placeholder="Introduza a sua palavra-passe"
                name="password"
                onChange={e => handleChange(e)}
              />
            </div>
          </div>

          <button type="submit">Iniciar Sessão</button>
          <span>
            Não tens conta?
            <Link to="/register">Regista-te </Link>
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

export default Login;
