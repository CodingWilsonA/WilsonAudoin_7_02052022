const express = require("express");
const {
  imageUpload,
  imageValidationErrorHandler,
} = require("../middleware/multer-config.js");
const router = express.Router();
const {
  getAllPosts,
  getUsersWhoLiked,
  createPost,
  deletePost,
  modifyPost,
  updateLikes,
  postUserLike,
  uploadImage,
} = require("../controllers/post-controller");

router.get("/posts", getAllPosts);
router.get("/posts/usersLiked", getUsersWhoLiked);
router.post("/posts", createPost);
router.post("/posts/usersLiked", postUserLike);
router.post(
  "/posts/images",
  imageUpload.single("imageFile"),
  imageValidationErrorHandler,
  uploadImage
);
router.put("/posts", modifyPost);
router.put("/posts/likes", updateLikes);
router.delete("/posts", deletePost);
module.exports = router;
