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
  deletePost(params) {
    return Api().delete("api/posts", { data: { params } });
  },
};
