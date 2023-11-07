const express = require("express");
const todoControllers = require("../controllers/todoController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//checks to see if a user is authorized to access the routes below
router.use(requireAuth);

router.route("/").get(todoControllers.getTodos).post(todoControllers.addTodo);

router
  .route("/:id")
  .get(todoControllers.getTodo)
  .delete(todoControllers.deleteTodo);

module.exports = router;
