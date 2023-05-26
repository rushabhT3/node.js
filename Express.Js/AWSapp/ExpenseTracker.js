const express = require("express");
const cors = require("cors");
const port = 3000;
const app = express();

const routes = require("./routes/router");
const purchaseRoutes = require("./routes/razorpayroutes");
const premiumFeatureRoutes = require("./routes/premiumFeature");
const PasswordRoutes = require("./routes/password");

const sequelize = require("./util/database");

const User = require("./models/users");
const dailyExpense = require("./models/expense");
const Order = require("./models/orders");
const Forgotpassword = require("./models/password");

// const dotenv = require("dotenv");
// dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/purchase", purchaseRoutes);
app.use("/premium", premiumFeatureRoutes);
app.use("/password", PasswordRoutes);
app.use("/", routes);

User.hasMany(dailyExpense);
dailyExpense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

sequelize.sync().then(
  app.listen(port, () => {
    console.log(`listening on port: ${port}`);
  })
);
