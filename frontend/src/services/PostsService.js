import Api from "./Api";

export default {
  getAllPosts() {
    return Api().get("api/posts");
  },
};
