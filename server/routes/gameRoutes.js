const { create, getCurrentRoom, joinRoom } = require("../controllers/gameController");

const router = require("express").Router();
router.post("/create", create);
router.get("/getCurrentRoom/:id", getCurrentRoom);
router.post("/joinRoom/:id", joinRoom);

module.exports = router;
