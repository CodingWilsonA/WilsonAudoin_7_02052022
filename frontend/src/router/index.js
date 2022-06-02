import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import MainView from "../views/MainView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/inscription",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/accueil",
    name: "main",
    component: MainView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
