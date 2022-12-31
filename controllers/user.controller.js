const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

//the function below generates a json web token when it is invoked
const createToken = (_id) => {
  //the _id below represents the payload in the token, the environment variable is the secret and the last parameter shows the expiration time
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
};

//login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    //the static login method created in the user.model is used to log in the user
    const user = await User.login(username, password);

    //create a token for the user
    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signupUser = async (req, res) => {
  const { username, password } = req.body; //destructure the username and password from the req.body

  try {
    //the static signup method created in the user.model is used to sign up the user
    const user = await User.signup(username, password);

    //create a token for the new user
    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
