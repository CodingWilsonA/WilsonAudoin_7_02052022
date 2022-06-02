const express = require("express");
const router = express.Router();
const { createPost } = require("../controllers/post-controller");

router.post("/posts", createPost);
module.exports = router;
