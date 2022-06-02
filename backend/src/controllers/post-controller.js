const db = require("../services/database");
const postModel = require("../models/post-model");

const createPost = async (req, res) => {
  try {
    const post = await postModel.validateAsync({
      content: req.body.content,
      authorId: req.body.authorId,
    });
    db.query(
      "INSERT INTO posts (content, author_id) VALUES (?,?)",
      [post.content, post.authorId],
      function (err) {
        if (err) {
          return res
            .status(400)
            .json({ message: `Bad request : ${err.message}` });
        }
        return res.status(201).json({ message: "Post sucessfully created" });
      }
    );
  } catch (err) {
    return res.status(400).json({ message: `Bad request : ${err.message}` });
  }
};

module.exports = { createPost };
