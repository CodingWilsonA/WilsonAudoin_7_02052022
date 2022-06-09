const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  createPost,
  deletePost,
  modifyPost,
  updateLikes,
} = require("../controllers/post-controller");

router.get("/posts", getAllPosts);
router.post("/posts", createPost);
router.put("/posts", modifyPost);
router.put("/posts/likes", updateLikes);
router.delete("/posts", deletePost);
module.exports = router;
