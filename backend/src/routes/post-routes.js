const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  createPost,
  deletePost,
  modifyPost,
} = require("../controllers/post-controller");

router.get("/posts", getAllPosts);
router.post("/posts", createPost);
router.put("/posts", modifyPost);
router.delete("/posts", deletePost);
module.exports = router;
