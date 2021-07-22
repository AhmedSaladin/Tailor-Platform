const { authToken } = require("../../middlewares/authToken");
const route = require("express").Router();
const {
  all_tailors_get,
  tailor_get,
  tailor_post,
  tailor_patch,
  tailor_delete,
  img_delete,
} = require("./tailor.controller");

route
  .get("/?", filter_tailors_get)
  .get("/", all_tailors_get)
  .get("/:id", tailor_get)
  .post("/", authToken, tailor_post)
  .patch("/:id", authToken, tailor_patch)
  .delete("/:id", authToken, tailor_delete)
  .delete("/?", authToken, img_delete);

module.exports = route;
