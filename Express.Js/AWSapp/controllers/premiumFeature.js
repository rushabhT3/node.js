const User = require("../models/users");
const dailyExpense = require("../models/expense");
const sequelize = require("../util/database");
const express = require("express");

const getUserLeaderBoard = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name"],
    });

    const expenses = await dailyExpense.findAll({
      attributes: [
        "UserId",
        [sequelize.fn("sum", sequelize.col("amount")), "total_amount"],
      ],
      group: ["UserId"],
    });

    const userCumExpenses = {};
    expenses.forEach((element) => {
      userCumExpenses[element.UserId] = element.dataValues.total_amount;
    });

    const leaderBoardDetails = users.map((element) => ({
      name: element.name,
      total_cost: userCumExpenses[element.id] || 0,
    }));

    leaderBoardDetails.sort((a, b) => b.total_cost - a.total_cost);
    res.status(200).json(leaderBoardDetails);
  } catch (err) {
    console.log({ "BE premiumfeature controller": err });
    res.status(500).json(err);
  }
};

module.exports = {
  getUserLeaderBoard,
};
