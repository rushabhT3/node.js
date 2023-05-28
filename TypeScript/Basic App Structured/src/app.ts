import express from "express";
const app = express();

import todosRoutes from './routes/todos'

// ? .json is used to parse the req body 
app.use(express.json())

app.use(todosRoutes)

app.listen(3000);
