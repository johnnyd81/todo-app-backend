const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // bcrypt hashes the password to provide protection

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//a static method that signs up a user
userSchema.statics.signup = async function (username, password) {
  //check that all fields are filled
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const exists = await this.findOne({ username });

  if (exists) {
    throw Error("Username already exists");
  }

  const salt = await bcrypt.genSalt(10); //generates rounds the password will be hashed with
  const hash = await bcrypt.hash(password, salt); //the hash method takes the password and the salt and creates a hashed password

  const user = await this.create({ username, password: hash });

  return user;
};

//a static method that logs in a user
userSchema.statics.login = async function (username, password) {
  //check that all fields are filled
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error("Incorrect username");
  }

  //the bcrypt method compare checks that the password is correct
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
