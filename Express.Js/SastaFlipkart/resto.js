const express = require("express");
const cors = require("cors");
const app = express();
const port = 7676;

const routes = require("./routes/router");
const { sequelize, Item } = require("./models/database");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);

sequelize.sync({ force: true }).then(
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  })
);
