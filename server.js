require("dotenv").config(); //gets the PORT number from the .env file
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todo.routes");
const userRoutes = require("./routes/user.routes");

const app = express(); //initiates the express app

//middleware
app.use(express.json()); //allows me to get access to the request body
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);

//Database configuration
mongoose
  .connect(process.env.MONGO_URI) //the URI is stored in the .env file which is imported using 'dotenv'
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to the database and listening on PORT",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
