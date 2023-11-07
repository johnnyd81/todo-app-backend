const User = require("../models/User");
const jwt = require("jsonwebtoken");

function createToken(id) {
  return jwt.sign({ _id: id }, process.env.SECRET, { expiresIn: "1d" });
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ errMsg: err.message });
  }
};

const signUpUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.signup(username, password);

    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (err) {
    res.status(400).json({ errMsg: err.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (err) {
    res.status(400).json({ errMsg: err.message });
  }
};

const authMethods = {
  signUpUser,
  loginUser,
  getUsers,
};

module.exports = authMethods;
