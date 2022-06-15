import Api from "./Api";

export default {
  getAllPosts() {
    return Api().get("api/posts");
  },
  getUsersWhoLiked() {
    return Api().get("api/posts/usersLiked");
  },
  createPost(postData) {
    return Api().post("api/posts", postData);
  },
  updatePost(postDataToUpdate) {
    return Api().put("api/posts", postDataToUpdate);
  },
  updateLikes(likedPostId) {
    return Api().put("api/posts/likes", likedPostId);
  },
  postUserIdLike(userIdPostId) {
    return Api().post("api/posts/usersLiked", userIdPostId);
  },
  uploadImage(imageData) {
    return Api().post("api/posts/images", imageData);
  },
  deletePost(params) {
    return Api().delete("api/posts", { data: { params } });
  },
};
