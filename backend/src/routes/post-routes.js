const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  imageUpload,
  imageValidationErrorHandler,
} = require("../middleware/multer-config.js");
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

router.get("/posts", auth, getAllPosts);
router.get("/posts/usersLiked", auth, getUsersWhoLiked);
router.post("/posts", auth, createPost);
router.post("/posts/usersLiked", auth, postUserLike);
router.post(
  "/posts/images",
  auth,
  imageUpload.single("imageFile"),
  imageValidationErrorHandler,
  uploadImage
);
router.put("/posts", auth, modifyPost);
router.put("/posts/likes", auth, updateLikes);
router.delete("/posts", auth, deletePost);
module.exports = router;
