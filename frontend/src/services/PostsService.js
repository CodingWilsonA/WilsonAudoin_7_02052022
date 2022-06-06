import Api from "./Api";

export default {
  getAllPosts() {
    return Api().get("api/posts");
  },
  createPost(postData) {
    return Api().post("api/posts", postData);
  },
  deletePost(params) {
    return Api().delete("api/posts", { data: { params } });
  },
};
