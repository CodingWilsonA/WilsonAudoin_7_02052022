const db = require("../services/database");
const postModel = require("../models/post-model");
const fs = require("fs");

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

const getUsersWhoLiked = (req, res) => {
  try {
    db.query("SELECT * FROM users_likes", function (err, usersLikesArray) {
      if (err) {
        return res.status(404).json({ message: err.message });
      }
      return res.status(200).json(usersLikesArray);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const post = await postModel.validateAsync({
      content: req.body.content,
      imageUrl: req.body.imageUrl === "" ? null : req.body.imageUrl,
      authorId: req.body.authorId,
    });
    db.query(
      "INSERT INTO posts (content, img_url, author_id) VALUES (?,?,?)",
      [post.content, post.imageUrl, post.authorId],
      function (err) {
        if (err) {
          return res
            .status(400)
            .json({ message: `Bad request : ${err.message}` });
        }
        return res.status(201).json({ message: "Post successfully created" });
      }
    );
  } catch (err) {
    return res.status(400).json({ message: `Bad request : ${err.message}` });
  }
};

const deletePost = (req, res) => {
  try {
    db.query(
      `SELECT img_url FROM posts WHERE post_id = ?;
      DELETE FROM users_likes WHERE post_id = ?; 
      DELETE FROM posts WHERE post_id = ?`,
      [
        req.body.params.postIdToDelete,
        req.body.params.postIdToDelete,
        req.body.params.postIdToDelete,
      ],
      function (err, queryResponses) {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
        if (queryResponses[0][0].img_url) {
          const fileName = queryResponses[0][0].img_url.split("/images/")[1];
          fs.unlink(`images/${fileName}`, (err) => {
            if (err) {
              console.error("Unlink failed :", err);
            } else {
              console.log("File deleted");
            }
          });
        }
        return res.status(204).json({ message: "Post successfully deleted" });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const modifyPost = (req, res) => {
  console.log(req.body);
  if (req.body.modifiedContent !== "" && req.body.modifiedImage !== "") {
    try {
      db.query(
        `SELECT img_url FROM posts WHERE post_id = ?;
        UPDATE posts SET content = ?, img_url = ? WHERE post_id = ?`,
        [
          req.body.postId,
          req.body.modifiedContent,
          req.body.modifiedImage,
          req.body.postId,
        ],
        function (err, queryResponses) {
          if (err) {
            return res.status(400).json({ message: err.message });
          }
          const fileName = queryResponses[0][0].img_url.split("/images/")[1];
          fs.unlink(`images/${fileName}`, (err) => {
            if (err) {
              console.error("Unlink failed :", err);
            } else {
              console.log("File deleted");
            }
          });
          return res.status(200).json({ message: "Post successfully updated" });
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } else if (req.body.modifiedImage === "") {
    try {
      db.query(
        "UPDATE posts SET content = ? WHERE post_id = ?",
        [req.body.modifiedContent, req.body.postId],
        function (err) {
          if (err) {
            return res.status(400).json({ message: err.message });
          }
          return res.status(200).json({ message: "Post successfully updated" });
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } else {
    try {
      db.query(
        `SELECT img_url FROM posts WHERE post_id = ?;
        UPDATE posts SET img_url = ? WHERE post_id = ?`,
        [req.body.postId, req.body.modifiedImage, req.body.postId],
        function (err, queryResponses) {
          if (err) {
            return res.status(400).json({ message: err.message });
          }
          const fileName = queryResponses[0][0].img_url.split("/images/")[1];
          fs.unlink(`images/${fileName}`, (err) => {
            if (err) {
              console.error("Unlink failed :", err);
            } else {
              console.log("File deleted");
            }
          });
          return res.status(200).json({ message: "Post successfully updated" });
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
};

const updateLikes = (req, res) => {
  try {
    db.query(
      "UPDATE posts SET likes = likes + 1 WHERE post_id = ?",
      [req.body.postId],
      function (err) {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
        return res.status(200).json({ message: "Likes successfully updated" });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const postUserLike = (req, res) => {
  try {
    db.query(
      "INSERT INTO users_likes (user_id, post_id) VALUES (?,?)",
      [req.body.userId, req.body.postId],
      function (err) {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
        return res
          .status(201)
          .json({ message: "User id who liked post successfully saved" });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const uploadImage = (req, res) => {
  res.status(201).json({
    filePath: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
};

module.exports = {
  getAllPosts,
  getUsersWhoLiked,
  createPost,
  deletePost,
  modifyPost,
  updateLikes,
  postUserLike,
  uploadImage,
};
