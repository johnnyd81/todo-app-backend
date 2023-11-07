const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoute");
const userRoutes = require("./routes/userRoute");
require("dotenv").config();

//initialize app
const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);

//connect to database
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to the DB and listening on PORT",
        process.env.PORT
      );
    });
  })
  .catch((err) => console.log(err));
