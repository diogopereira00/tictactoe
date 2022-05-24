const { create } = require("../controllers/gameController");

const router = require("express").Router();
router.post("/create", create);

module.exports = router;
