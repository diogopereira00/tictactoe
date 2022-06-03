const {
  create,
  getCurrentRoom,
  joinRoom,
  endGameLeaver,
  getAllGamesFromPlayer,
  winner,
} = require("../controllers/gameController");

const router = require("express").Router();
router.post("/create", create);
router.get("/getCurrentRoom/:id", getCurrentRoom);
router.post("/joinRoom/:id", joinRoom);
router.post("/leaver/:id", endGameLeaver);
router.post("/winner/:id", winner);

router.get("/getAllGamesFromPlayer/:id", getAllGamesFromPlayer);

module.exports = router;
