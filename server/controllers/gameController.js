const Game = require("../model/gameModel");
const { use } = require("../routes/userRoutes");

module.exports.create = async (req, res, next) => {
  try {
    const { gameID, player1 } = req.body;
    const gameIDcheck = await Game.findOne({ gameID });
    const player1Check = await Game.find({ player1 })
      .where({ status: "open" })
      .update({ status: "closed" });
    console.log("------player1-----");
    console.log(player1Check);
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
    return res.json({ status: true, game });
  } catch (ex) {
    next(ex);
  }
};
