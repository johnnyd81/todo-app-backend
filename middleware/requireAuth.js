const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Authorization token is required" });
  }

  const token = authorization.split(" ")[1];

  try {
    //destructured the _id from the payload of the token
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    next(); //move to next middleware
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "User is not authorized" });
  }
};

module.exports = requireAuth;
