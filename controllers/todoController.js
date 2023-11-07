const Todo = require("../models/Todo");
const mongoose = require("mongoose");

const getTodos = async (req, res) => {
  const user_id = req.user._id;

  try {
    const todos = await Todo.find({ user_id }); //only fetches todos that match a certain user
    res.status(200).json(todos);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const getTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Todo does not exist" });
  }

  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(400).json({ error: "Todo does not exist" });
  }

  res.status(200).json(todo);
};

const addTodo = async (req, res) => {
  const { title } = req.body;

  try {
    const user_id = req.user._id;

    const todo = await Todo.create({ title, user_id });
    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Todo does not exist" });
  }

  const todo = await Todo.findByIdAndDelete({ _id: id });

  if (!todo) {
    return res.status(400).json({ error: "Todo does not exist" });
  }

  res.status(200).json(todo);
};

const todoControllers = {
  getTodos,
  getTodo,
  addTodo,
  deleteTodo,
};

module.exports = todoControllers;
