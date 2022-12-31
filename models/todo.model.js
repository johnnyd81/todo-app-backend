const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    user_id: {
      //adds a unique id to assign a todo to a user
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
