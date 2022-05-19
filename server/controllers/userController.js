const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    const emailCheck = await User.findOne({ email });

    // Se ja existirem retorno o erro

    if (usernameCheck) return res.json({ msg: "Este username já existe", status: false });
    // console.log(req.body);
    if (emailCheck) return res.json({ msg: "Este email já existe", status: false });
    // console.log(req.body);

    const passwordEncriptada = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: passwordEncriptada,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
//mudar esta funçao para ir buscar todos os dados do utilizador
module.exports.getImage = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("id " + id);
    const user = await User.findById(id);
    console.log(user.username);
    return res.json({
      image: user.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        msg: "Nome de utilizador ou palavra-passe incorretos",
        status: false,
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    // console.log(req.body);
    if (!isPasswordCorrect) {
      return res.json({
        msg: "Nome de utilizador ou palavra-passe incorretos.",
        status: false,
      });
    }

    delete user.password;
    console.log(user);
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: true,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};
