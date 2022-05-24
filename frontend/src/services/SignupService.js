import Api from "./Api";

export default {
  register(credentials) {
    return Api().post("api/auth/signup", credentials);
  },
};
