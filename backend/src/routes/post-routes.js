const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  getUsersWhoLiked,
  createPost,
  deletePost,
  modifyPost,
  updateLikes,
  postUserLike,
} = require("../controllers/post-controller");

router.get("/posts", getAllPosts);
router.get("/posts/usersLiked", getUsersWhoLiked);
router.post("/posts", createPost);
router.post("/posts/usersLiked", postUserLike);
router.put("/posts", modifyPost);
router.put("/posts/likes", updateLikes);
router.delete("/posts", deletePost);
module.exports = router;
