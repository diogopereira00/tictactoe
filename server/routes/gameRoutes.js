const {
  create,
  getCurrentRoom,
  joinRoom,
  endGameLeaver,
  getAllGamesFromPlayer,
  winner,
  getAllPublicOpenGames,
  deleteGame,
} = require("../controllers/gameController");

const router = require("express").Router();
router.post("/create", create);
router.get("/getCurrentRoom/:id", getCurrentRoom);
router.post("/joinRoom/:id", joinRoom);
router.post("/leaver/:id", endGameLeaver);
router.post("/winner/:id", winner);

router.get("/getAllGamesFromPlayer/:id", getAllGamesFromPlayer);
router.get("/getAllPublicOpenGames/", getAllPublicOpenGames);
router.post("/deleteGame/:id", deleteGame);

module.exports = router;
