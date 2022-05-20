const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");

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

const server = app.listen(process.env.PORT, () => {
  console.log(`Server arrancou na Porta ${process.env.PORT}`);
});
