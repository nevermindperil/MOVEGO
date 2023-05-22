import Vue from 'vue'
import VueRouter from 'vue-router'
// 메인페이지 ( HOME )
import HomeView from '../views/HomeView.vue'
// Login
import SignUpView from '../views/Login/SignUpView.vue'
import LogInView from '../views/Login/LoginView.vue'
// Movies
import MoviesView from "../views/Movies/MoviesView.vue";
// Ego
import EgoView from "../views/Ego/EgoView.vue";
// EgoExpand
import EgoExpandView from "../views/EgoExpand/EgoExpandView.vue"



Vue.use(VueRouter)

const routes = [
  // 메인 홈
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  // Movies 메인 홈
  {
    path: "/movies",
    name: "movies",
    component: MoviesView,
  },
  // Ego 메인 홈
  {
    path: "/EgoView",
    name: "EgoView",
    component: EgoView,
  },
  // EgoExpand 메인 홈
  {
    path: "/egoExpand",
    name: 'egoExpand',
    component: EgoExpandView,
  },
  // Login
  {
    path: '/login',
    name: 'LogInView',
    component: LogInView
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
