const express = require("express");
const cors = require("cors");
const port = 3000;

const routes = require("./routes/router");

const sequelize = require("./util/database");
const User = require("./models/users");
const dailyExpense = require("./models/expense");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", routes);

sequelize.sync().then(
  app.listen(port, () => {
    console.log(`listening on port: ${port}`);
  })
);
