import Api from "./Api";

export default {
  createPost(postData) {
    return Api().post("api/posts", postData);
  },
};
