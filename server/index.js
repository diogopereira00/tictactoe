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
const io = socket(server, {
  cors: {
    origin: "http://192.168.1.96:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("reqTurn", (data) => {
    const room = JSON.parse(data).room;
    io.to(room).emit("playerTurn", data);
  });

  socket.on("create", (sala) => {
    socket.join(sala);
  });

  socket.on("join", (sala) => {
    socket.join(sala.sala);
    console.log(sala.player2);
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
