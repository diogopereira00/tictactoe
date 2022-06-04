const Game = require("../model/gameModel");
const User = require("../model/userModel");

const { use } = require("../routes/userRoutes");

module.exports.create = async (req, res, next) => {
  try {
    const { player1, melhorde, public } = req.body;
    const player1Data = await User.findById(player1);
    random = Array.from(Array(8), () => Math.floor(Math.random() * 36).toString(36)).join("");
    // console.log(random);
    const gameIDcheck = await Game.findOne({ gameID: random });
    if (gameIDcheck) return res.json({ msg: "Erro", status: false });
    //verifica se o player1 ja tem um jogo aberto, sem ninguem
    // console.log("a");
    const player1Check = await Game.findOne({ player1 }).where({ status: "open" });
    // console.log(player1Check);
    var game = "";
    if (player1Check !== null) {
      // console.log("b");
      await Game.findOne({ player1 }).where({ status: "open" }).remove();
    }

    game = await Game.create({
      gameID: random,
      player1,
      player2: "",
      status: "open",
      vencedor: "",
      melhorde,
      public,
      createTime: new Date(),
      endTime: "",
    });

    // console.log(game);

    // console.log(game);

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
        melhorde: game.melhorde,
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
    const game = await Game.findOneAndUpdate(
      { gameID: id },
      { player2: player2, status: "running" }
    );
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
        melhorde: game.melhorde,
      },
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.endGameLeaver = async (req, res, next) => {
  try {
    // console.log("id " + id);
    const idLeaver = req.params.id;
    var game = await Game.findOne({ idLeaver }).where({ status: "running" });

    // console.log("gameeeeeeeeeee");
    // console.log(game);
    if (game.player1 === idLeaver) {
      // console.log("entrei aqui");
      game = await Game.findOneAndUpdate(
        { gameID: game.gameID },
        { vencedor: game.player2, status: "closed", endTime: new Date() }
      );
    } else {
      game = await Game.findOneAndUpdate(
        { gameID: game.gameID },
        { vencedor: game.player1, status: "closed", endTime: new Date() }
      );
    }
    return res.json({
      status: true,
      game,
    });
  } catch (ex) {
    next(ex);
  }
};
module.exports.winner = async (req, res, next) => {
  try {
    // console.log("id " + id);
    const idWinner = req.params.id;
    var game = await Game.findOne({ idWinner }).where({ status: "running" });

    // console.log("gameeeeeeeeeee");
    // console.log(game);
    if (game.player1 === idWinner && game.player1 != null) {
      // console.log("entrei aqui");
      game = await Game.findOneAndUpdate(
        { gameID: game.gameID },
        { vencedor: game.player1, status: "closed", endTime: new Date() }
      );
    } else {
      game = await Game.findOneAndUpdate(
        { gameID: game.gameID },
        { vencedor: game.player2, status: "closed", endTime: new Date() }
      );
    }
    return res.json({
      status: true,
      game,
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
      game,
    });
  } catch (ex) {
    next(ex);
  }
};
module.exports.getAllGamesFromPlayer = async (req, res, next) => {
  try {
    const id = req.params.id;
    // console.log("id " + id);
    console.log(id);
    const game = await Game.find({ $or: [{ player1: id }, { player2: id }] })
      .where({ status: "closed" })
      .sort({ endTime: -1 });
    var partidasGanhas = 0;
    var totalPartidas = 0;
    // game.forEach((element) => {
    //   if (element.player1 === id) {
    //     if (element.vencedor === element.player1) {
    //       element.resultado = "VITORIA";
    //     } else if (element.vencedor === element.player2) {
    //       element.resultado = "DERROTA";
    //     } else {
    //       element.resultado = "EMPATE";
    //     }
    //     // const adversario = getUser(element.player2);
    //     // element.adversario = adversario;
    //   } else {
    //     if (element.player2 === element.vencedor) {
    //       element.resultado = "VITORIA";
    //     } else if (element.player1 === element.vencedor) {
    //       element.resultado = "DERROTA";
    //     } else {
    //       element.resultado = "EMPATE";
    //     }
    //   }
    // });

    // console.log(game);
    // console.log(game);
    return res.json({
      game,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllPublicOpenGames = async (req, res, next) => {
  try {
    // const id = req.params.id;
    // console.log("id " + id);
    const game = await Game.find({ status: "open", public: true });
    // console.log(game);
    return res.json({
      game,
    });
  } catch (ex) {
    next(ex);
  }
};
module.exports.deleteGame = async (req, res, next) => {
  try {
    const id = req.params.id;
    // console.log("id " + id);
    console.log("tou aqui");
    const game = await Game.find({ gameID: id }).deleteOne();
    console.log(game);
    return res.json({
      status: "ok",
    });
  } catch (ex) {
    next(ex);
  }
};
