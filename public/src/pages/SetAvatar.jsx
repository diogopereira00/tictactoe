import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mais from "../assets/upload.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import { setAvatarRoute } from "../utils/APIRoutes";
import Loader from "../components/Loader";

export default function SetAvatar() {
  const api = "https://api.multiavatar.com/Y3fZ4WT7dkaQz1";
  // falta usar a key
  const apiKey = "?apikey=Y3fZ4WT7dkaQz1";
  const [baseImage, setBaseImage] = useState(mais);
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
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
      const data = [];
      for (let i = 0; i < 2; i++) {
        const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
        console.log(image);

        const buffer = new Buffer(image.data);
        console.log("buffer: " + buffer);
        data.push("data:image/svg+xml;base64," + buffer.toString("base64"));
      }
      data.push(baseImage);
      console.log(data);
      setAvatars(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          {/* <img src={loader} alt="loader" className="loader" /> */}
          <Loader />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Seleciona uma imagem de perfil</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                  {/* se for a ultima foto na lista, é para adicionar entao */}
                  {index === avatars.length - 1 ? (
                    <label htmlFor="file-input">
                      <img
                        className="displayImages"
                        src={avatar}
                        alt="avatar"
                        id={index}
                        onClick={() => setSelectedAvatar(index)}
                      />
                      <input
                        className="displayFile"
                        id="file-input"
                        type="file"
                        onChange={(e) => {
                          uploadImage(e);
                        }}
                      />
                    </label>
                  ) : (
                    // caso contrario
                    <img
                      src={avatar}
                      alt="avatar"
                      id={index}
                      onClick={() => setSelectedAvatar(index)}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Definir imagem de perfil
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .displayImages {
    max-width: 96px;
    border-radius: 50%;
  }
  .displayFile {
    display: none;
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
      &:hover {
        border: 0.4rem solid #00c6ff;
      }
    }
    .selected {
      border: 0.4rem solid #0a72e7;
      &:hover {
        border: 0.4rem solid #0a72e7;
      }
    }
  }
  .submit-btn {
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
      background-color: #4e0eff;
    }
  }
`;
