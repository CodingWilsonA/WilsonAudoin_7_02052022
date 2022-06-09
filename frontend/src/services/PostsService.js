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
  updateLikes() {
    return Api().put("api/posts/likes");
  },
  deletePost(params) {
    return Api().delete("api/posts", { data: { params } });
  },
};
