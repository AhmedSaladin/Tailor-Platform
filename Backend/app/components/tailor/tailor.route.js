const route = require("express").Router();
const {
  all_tailors_get,
  tailor_get,
  tailor_post,
  tailor_put,
  tailor_delete,
} = require("./tailor.controller");

route
  .get("/", all_tailors_get)
  .get("/:id", tailor_get)
//   .post("/", tailor_post)
//   .put("/:id", tailor_put)
//   .delete("/:id", tailor_delete);

module.exports = route;
