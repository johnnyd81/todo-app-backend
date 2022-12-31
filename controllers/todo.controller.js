const mongoose = require("mongoose");
const Todo = require("../models/todo.model");

//get all todos
const getTodos = async (req, res) => {
  const user_id = req.user._id; //only fetches todos that matches a specific user

  const todos = await Todo.find({ user_id });

  res.status(200).json(todos);
};

//add a todo
const addTodo = async (req, res) => {
  const { description } = req.body;

  let noTodo = []; //if a value is in the array an error is shown onscreen

  if (!description) {
    noTodo.push("description"); //adds description field to the array and causes an error to be shown
  }

  if (noTodo.length > 0) {
    return res.status(400).json({ error: "Please enter a todo" });
  }

  try {
    const user_id = req.user._id;
    const todo = await Todo.create({ description, user_id });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    //checks for a valid id
    return res.status(404).json({ error: "No such todo" });
  }

  const todo = await Todo.findByIdAndDelete({ _id: id });

  if (!todo) {
    return res.status(400).json({ error: "No such todo" });
  }

  res.status(200).json(todo);
};

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
};
