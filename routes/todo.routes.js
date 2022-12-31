const express = require("express");
const {
  getTodos,
  addTodo, //imports the method for each route
  deleteTodo,
} = require("../controllers/todo.controller");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//the requireAuth middleware executes before all the other routes to prevent unauthorized users from using them
router.use(requireAuth);

router.get("/", getTodos); //get all the todos

router.post("/add", addTodo); //adds a todo

router.delete("/:id", deleteTodo); //deletes a todo

module.exports = router;
