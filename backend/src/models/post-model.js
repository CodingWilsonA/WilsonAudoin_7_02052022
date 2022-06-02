const joi = require("joi");

module.exports = joi.object({
  content: joi.string(),
  authorId: joi.number(),
});
