const joi = require("joi");

module.exports = joi.object({
  content: joi.string(),
  imageUrl: joi.string().allow(null).allow(""),
  authorId: joi.number(),
});
