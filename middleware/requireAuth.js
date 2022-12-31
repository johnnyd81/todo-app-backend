const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const requireAuth = async (req, res, next) => {
  //check that a user is authorized by destructuring the authorization from the request.headers
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token is required" });
  }
  //by using the split method the token can be seperated from the Bearer keyword by only using the token value at position [1]
  const token = authorization.split(" ")[1];

  try {
    //the verify method returns the payload of the token and I destructured the _id from that token
    const { _id } = jwt.verify(token, process.env.SECRET);

    //the request below attaches the user or any other variable to the request and only returns the _id from the findOne() method by using the select method
    req.user = await User.findOne({ _id }).select("_id");
    next(); //if the req.user has a _id returned to it then the next handlers after it will have the req.user property on it's req parameter eg. getTodos
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "User is not authorized" });
  }
};

module.exports = requireAuth;
