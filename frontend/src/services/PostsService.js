import postsServicesApi from "./PostsServicesApi";

export default {
  getAllPosts() {
    return postsServicesApi.get("api/posts");
  },
  getUsersWhoLiked() {
    return postsServicesApi.get("api/posts/usersLiked");
  },
  createPost(postData) {
    return postsServicesApi.post("api/posts", postData);
  },
  updatePost(postDataToUpdate) {
    return postsServicesApi.put("api/posts", postDataToUpdate);
  },
  updateLikes(likedPostId) {
    return postsServicesApi.put("api/posts/likes", likedPostId);
  },
  postUserIdLike(userIdPostId) {
    return postsServicesApi.post("api/posts/usersLiked", userIdPostId);
  },
  uploadImage(imageData) {
    return postsServicesApi.post("api/posts/images", imageData);
  },
  deletePost(params) {
    return postsServicesApi.delete("api/posts", { data: { params } });
  },
};
