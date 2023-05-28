import { Router } from "express";

import { Todo } from "../models/todo";

const router = Router();

let todos: Todo[] = [];

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const newTodo = {
    id: new Date().toISOString(),
    text: req.body.text,
  };
  todos.push(newTodo);
  res.status(201).json({ message: "Updated todo", todos: todos });
});

router.delete("/todo/:todoId", (req, res, next) => {
  todos = todos.filter((element) => element.id !== req.params.todoId);
  res.status(200).json({ message: "Deleted todo", todos: todos });
});

router.put("/todo/:todoId", (req, res, next) => {
  // ? find the index
  const index = todos.findIndex((element) => element.id === req.params.todoId);
  //   ? array[index] = object: {id: array[index].id, text: req.body.text}
  if (index >= 0) {
    todos[index] = { id: todos[index].id, text: req.body.text };
    return res.status(200).json({ message: "Updated todo", todos: todos });
  }
});

export default router;
