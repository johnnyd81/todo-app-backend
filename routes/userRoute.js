const express = require("express");
const authMethods = require("../controllers/userController");

const router = express.Router();

router.route("/").get(authMethods.getUsers);

router.route("/signup").post(authMethods.signUpUser);

router.route("/login").post(authMethods.loginUser);

module.exports = router;
