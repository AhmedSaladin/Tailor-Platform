const Joi = require("joi");

module.exports = { userSchema: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().lowercase().required(),
    phone: Joi.number().min(11).required(),
    password: Joi.string()
      .min(8)
      .required()
      .pattern(
        new RegExp(
          "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/"
        )
      ),
  })
}