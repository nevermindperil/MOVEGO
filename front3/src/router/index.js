import Vue from "vue";
import VueRouter from "vue-router";
// Home
import HomeView from "@/views/HomeView";
// Accounts
import SignUpView from "@/views/Accounts/SignUpView";
import LogInView from "@/views/Accounts/LoginView";
import ProfileView from "@/views/Accounts/ProfileView";
// Movies
import MoviesView from "@/views/Movies/MoviesView";
import MovieDetailView from "@/views/Movies/MovieDetailView.vue";

// EgoExpand (영화 관련 질문 페이지)
import EgoExpandView from "@/views/EgoExpand/EgoExpandView";

Vue.use(VueRouter);

const routes = [
  // 메인 홈
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  // Movies
  {
    path: "/movies",
    name: "movies",
    component: MoviesView,
  },
  // Movies detail 페이지
  {
    path: "/movies/:id",
    name: "MovieDetail",
    component: MovieDetailView,
  },

  {
    path: "/egoExpand",
    name: "egoExpand",
    component: EgoExpandView,
  },
  // Login
  {
    path: "/login",
    name: "LogInView",
    component: LogInView,
  },
  {
    path: "/signup",
    name: "SignUpView",
    component: SignUpView,
  },
  {
    path: "/profile/:username/",
    name: "ProfileView",
    component: ProfileView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
