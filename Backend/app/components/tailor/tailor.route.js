const { authToken } = require("../../middlewares/authToken");
const route = require("express").Router();
const {
  search_tailors_get,
  filter_tailors_get,
  all_tailors_get,
  tailor_get,
  tailor_post,
  tailor_patch,
  tailor_delete,
  img_delete,
} = require("./tailor.controller");

route
  .get("/", all_tailors_get)
  .get("/search?", search_tailors_get)
  .get("/filter?", filter_tailors_get)
  .get("/:id", tailor_get)
  .post("/", authToken, tailor_post)
  .patch("/:id", authToken, tailor_patch)
  .delete("/:id", authToken, tailor_delete)
  .delete("/?", authToken, img_delete);

module.exports = route;
