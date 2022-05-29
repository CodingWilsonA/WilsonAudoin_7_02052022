const joi = require("joi");

module.exports = joi.object({
  firstName: joi.string(),
  lastName: joi.string(),
  email: joi.string().required(),
  password: joi.string().required(),
});
