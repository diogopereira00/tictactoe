const Game = require("../model/gameModel");
const User = require("../model/userModel");

const { use } = require("../routes/userRoutes");

module.exports.create = async (req, res, next) => {
  try {
    const { gameID, player1 } = req.body;
    const player1Data = await User.findById(player1);
    const gameIDcheck = await Game.findOne({ gameID });
    const player1Check = await Game.find({ player1 })
      .where({ status: "open" })
      .updateMany({ status: "closed" });
    // console.log("------player1-----");
    // console.log(player1Check);
    // Se ja existirem retorno o erro

    if (gameIDcheck) return res.json({ msg: "Erro", status: false });
    // console.log(req.body);

    // console.log(req.body);

    const game = await Game.create({
      gameID,
      player1,
      player2: "",
      status: "open",
    });
    return res.json({
      status: true,
      game: {
        gameID: game.gameID,
        player1: {
          id: player1Data._id,
          username: player1Data.username,
          avatar: player1Data.avatarImage,
        },
        player2: "",
        status: game.status,
      },
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.joinRoom = async (req, res, next) => {
  try {
    const id = req.params.id;
    const player2 = req.body.player2;

    // console.log("id " + id);
    const roomCheck = await Game.findOne({ gameID: id });
    if (player2 === roomCheck.player1) {
      return res.json({ msg: "Erro, não podes entrar no mesmo jogo", status: false });
    }
    if (roomCheck.player2 != "") {
      return res.json({ msg: "Erro, esta sala está cheia", status: false });
    }

    const player1Data = await User.findById(roomCheck.player1);
    const player2Data = await User.findById(player2);
    const game = await Game.findOneAndUpdate({ gameID: id }, { player2: player2 });
    // console.log(game.player1);
    return res.json({
      status: true,
      game: {
        gameID: game.gameID,
        player1: {
          id: player1Data._id,
          username: player1Data.username,
          avatar: player1Data.avatarImage,
        },
        player2: {
          id: player2Data._id,
          username: player2Data.username,
          avatar: player2Data.avatarImage,
        },
        status: game.status,
      },
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getCurrentRoom = async (req, res, next) => {
  try {
    const id = req.params.id;
    // console.log("id " + id);
    const game = await Game.findOne({ gameID: id });
    // console.log(game.player1);
    return res.json({
      gameID: game.gameID,
      player1: game.player1,
      player2: game.player2,
      status: game.status,
    });
  } catch (ex) {
    next(ex);
  }
};
