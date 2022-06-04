const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const gameRoutes = require("./routes/gameRoutes");

const { Server } = require("socket.io");
const http = require("http");
const app = express();
require("dotenv").config();
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/games", gameRoutes);

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexão a base de dados estabelecida");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = http.createServer(app);

const socket = require("socket.io");
const { db } = require("./model/gameModel");
const io = socket(server, {
  cors: {
    origin: "http://192.168.1.96:3000",
  },
});
const users = {};
io.on("connection", (socket) => {
  socket.once("connectUser", (user, idUser) => {
    console.log(" conectado " + user + "id: " + idUser + " socketID " + socket.id);

    if (Object.values(users).includes(user) === false) {
      users[socket.id] = user;
    }

    io.emit("onlineUsers", Object.keys(users).length);
    socket.username = user;
    socket.userID = idUser;
    console.log(users);
  });
  socket.on("disconnect", async () => {
    console.log(
      "disconectado " +
        socket.username +
        " idUser:  " +
        socket.userID +
        " " +
        socket.id +
        " na sala "
    );
    var teste = db.collection("games");
    var existejogo = await teste.findOne({ player1: socket.userID, status: "open" });
    if (existejogo !== null) {
      await teste.deleteOne({ player1: socket.userID, status: "open" });
    }
    delete users[socket.id];
    io.emit("leaverGame", socket.userID);
    io.emit("onlineUsers", Object.keys(users).length);
  });
  socket.on("reqTurn", (data) => {
    const room = JSON.parse(data).room;
    io.to(room).emit("playerTurn", data);
  });

  socket.on("create", (sala) => {
    socket.join(sala);
  });

  socket.on("join", (sala) => {
    socket.join(sala.sala);
    // console.log(sala.player2);
    io.to(sala.sala).emit("opponent_joined", sala.player2, sala.player2Avatar, sala.player2ID);
  });

  socket.on("reqRestart", (data) => {
    const room = JSON.parse(data).room;
    io.to(room).emit("restart");
  });
});
server.listen(process.env.PORT, () => {
  console.log(`Server arrancou na Porta ${process.env.PORT}`);
});
