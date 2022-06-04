const express = require("express");
const router = express.Router();
const { getAllPosts, createPost } = require("../controllers/post-controller");

router.get("/posts", getAllPosts);
router.post("/posts", createPost);
module.exports = router;
