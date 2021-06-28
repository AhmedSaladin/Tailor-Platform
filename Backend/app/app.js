require("./db/config");
const morgan = require("morgan");
const express = require("express");

module.exports = (app) => {
  app.use(morgan("dev"));
  app.use(express.json());
};
