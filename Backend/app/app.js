require("./db/config");
const morgan = require("morgan");
const express = require("express");
const User = require("./components/user/user.route");
const commentRouters = require("./components/comments/comment.router");
const order = require('./components/order/order.router')
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

module.exports = (app) => {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use("/api/users", User);
  app.use("/api/comments", commentRouters);
  app.use('/api/orders',order);
  app.use(err);
  app.use(errorHandler);
  app.use("*", notFound);
};
