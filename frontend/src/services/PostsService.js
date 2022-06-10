import Api from "./Api";

export default {
  getAllPosts() {
    return Api().get("api/posts");
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
  deletePost(params) {
    return Api().delete("api/posts", { data: { params } });
  },
};
