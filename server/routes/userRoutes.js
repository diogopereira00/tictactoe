const {
  register,
  login,
  setAvatar,
  getCurrentUser,
  getAllUsers,
} = require("../controllers/userController");

const router = require("express").Router();
router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/getCurrentUser/:id", getCurrentUser);
router.get("/getAllUsers", getAllUsers);

module.exports = router;
