const Joi = require("joi");

userSchema = Joi.object().keys({
  name: Joi.string().min(7).max(30).required(),
  email: Joi.string().email().lowercase().required(),
  phone: Joi.string()
    .required()
    .pattern(new RegExp("^(010|011|012|015)[0-9]{8}$")),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*()-_]).{8,}$"
      )
    ),
});
tailorSchema = userSchema.keys({
  designFor: Joi.string().valid("male", "female").required(),
});

tailorUpdateAboutSchema = Joi.object({
  about: Joi.string().min(30).required(),
});

tailorUpdateNameSchema = Joi.object({
  name: Joi.string().min(7).max(30).required(),
  designFor: Joi.string().valid("male", "female").required(),
});

module.exports = {
  userSchema,
  tailorSchema,
  tailorUpdateAboutSchema,
  tailorUpdateNameSchema,
};
