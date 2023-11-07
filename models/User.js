const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//static method to sign up a user
userSchema.statics.signup = async function (username, password) {
  //check that both the username and the password are present
  if (!username || !password) {
    throw Error("Please complete all the fields");
  }

  //if the username and password are present, check to see if they exist in the database
  const exists = await this.findOne({ username });

  if (exists) {
    throw Error("Username already exists");
  }

  //encrypt the password for security using the bcrypt package before adding the user info to the database
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);

  //create a new user
  const user = await this.create({ username, password: hash });

  return user;
};

//static method that logs a user in
userSchema.statics.login = async function (username, password) {
  //check the login credentials i.e. username and password
  if (!username || !password) {
    throw Error("Please complete all the fields");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error("Incorrect username");
  }

  //compare the password with the user password stored in the database
  const compare = await bcrypt.compare(password, user.password);

  if (!compare) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("Userlist", userSchema);
