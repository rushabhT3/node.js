const User = require("../models/users");
const dailyExpense = require("../models/expense");
const sequelize = require("../util/database");
const express = require("express");

const getUserLeaderBoard = async (req, res) => {
  try {
    const leaderBoardDetails = await User.findAll({
      attributes: [
        "id",
        "name",
        [
          sequelize.fn("SUM", sequelize.col("dailyExpenses.amount")),
          "total_cost",
        ],
      ],
      include: [
        {
          model: dailyExpense,
          attributes: [],
        },
      ],
      group: ["User.id"],
      order: [["total_cost", "DESC"]],
    });

    res.status(200).json(leaderBoardDetails);
  } catch (err) {
    console.log({ "BE premiumfeature controller": err });
    res.status(500).json(err);
  }
};

module.exports = {
  getUserLeaderBoard,
};
