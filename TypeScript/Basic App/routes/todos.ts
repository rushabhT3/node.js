import { Router } from "express";

import { Todo } from "../models/todo";

const router = Router();

// ! using this to enhance ts so to get the newer suggestions
type RequestBody = { text: string };
type RequestParams = { todoId: string };

let todos: Todo[] = [];

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };
  todos.push(newTodo);
  res.status(201).json({ message: "Updated todo", todos: todos });
});

router.delete("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  // ? iterate through array take the condition and store the value that statisfy the condition into stored array
  todos = todos.filter((element) => element.id !== params.todoId);
  res.status(200).json({ message: "Deleted todo", todos: todos });
});

router.put("/todo/:todoId", (req, res, next) => {
  const body = req.body as RequestBody;
  const params = req.params as RequestParams;
  // ? find the index
  const index = todos.findIndex((element) => element.id === params.todoId);
  // ? array[index] = object: {id: array[index].id, text: req.body.text}
  if (index >= 0) {
    todos[index] = { id: todos[index].id, text: body.text };
    return res.status(200).json({ message: "Updated todo", todos: todos });
  }
});

export default router;
