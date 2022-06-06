const db = require("../services/database");
const postModel = require("../models/post-model");

const getAllPosts = (req, res) => {
  try {
    db.query(
      `SELECT users.first_name, users.last_name, posts.* FROM users
       JOIN posts
       ON users.user_id = posts.author_id ORDER BY created_at DESC;`,
      function (err, postsArray) {
        if (err) {
          return res.status(404).json({ message: err.message });
        }
        return res.status(200).json(postsArray);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

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

module.exports = { getAllPosts, createPost };
