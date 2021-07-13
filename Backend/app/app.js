require("./db/config");
const morgan = require("morgan");
const express = require("express");
const User = require("./components/user/user.route");
const err = require("./middlewares/errorHandler");
const commentRouters = require("./components/comments/comment.router");
const order = require('./components/order/order.router')

module.exports = (app) => {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use("/api/users", User);
  app.use("/api/comments", commentRouters);
  app.use(err);
  // order routes
  app.use(order);
};
