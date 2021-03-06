require("./db/config");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const User = require("./components/user/user.route");
const Tailor = require("./components/tailor/tailor.route");
const commentRouters = require("./components/comments/comment.router");
const order = require("./components/order/order.router");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

module.exports = (app) => {
  app.use(morgan("dev"));
  // app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.static("frontend"));
  app.use("/api/users", User);
  app.use("/api/tailors", Tailor);
  app.use("/api/comments", commentRouters);
  app.use("/api/orders", order);
  app.use(errorHandler);
  app.use("*", express.static("frontend"));
};
