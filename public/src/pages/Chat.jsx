import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { getImageRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";

export default function Chat() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    async function fetchData() {
      const user = JSON.parse(localStorage.getItem("user"));

      setCurrentUser(user);
      const data = await axios.get(`${getImageRoute}/${user._id}`);
      console.log("dados user : " + data.image);
      setItems(data);
      console.log("user:" + user._id);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div>Chat</div>
          <Loader />
          {console.log(items)}
          <img src={items.data.image} alt="teste" />
        </>
      )}
    </>
  );
}
