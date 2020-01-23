// @ts-nocheck
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Subscribe from "../views/Subscribe.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import PasswordResetEmail from "../views/PasswordResetEnterEmail.vue";
import PasswordResetSecurityQuestion from "../views/PasswordResetCheckQuestion";
import PasswordReset from "../views/PasswordReset";
import Video from "../views/Video";
import Category from "../views/Category";
import RegisterVideo from "../views/RegisterVideo";
import Favorites from "../views/Favorites";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/favorites",
    name: "favorites",
    component: Favorites
  },
  {
    path: "/category",
    name: "category",
    component: Category
  },
  {
    path: "/videos/create",
    name: "video-register",
    component: RegisterVideo
  },
  { path: "/videos/:id", name: "video-details", component: Video },
  {
    path: "/profile",
    name: "profile",
    component: Profile
  },
  {
    path: "/password-reset/reset-form",
    name: "password-reset-reset-form",
    component: PasswordReset
  },
  {
    path: "/password-reset/security-question",
    name: "password-reset-security-question",
    component: PasswordResetSecurityQuestion
  },
  {
    path: "/password-reset/email",
    name: "password-reset-email",
    component: PasswordResetEmail
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/subscribe",
    name: "subscribe",
    component: Subscribe
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("auth");
  let unProtected = [
    "register",
    "login",
    "home",
    "password-reset-email",
    "password-reset-security-question",
    "password-reset-reset-form"
  ];
  if (!unProtected.includes(to.name) && !token) {
    return next("/login");
  }

  if (to.name == "login" && token) {
    return next("/");
  }
  next();
});

export default router;
