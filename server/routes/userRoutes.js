const { register, login, setAvatar, getItem, getImage } = require("../controllers/userController");

const router = require("express").Router();
router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/getImage/:id", getImage);

module.exports = router;
