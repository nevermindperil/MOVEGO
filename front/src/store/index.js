import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import router from "../router";

const API_URL = "http://127.0.0.1:8000";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    movies: [],
    token: null,
    username: null,
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false;
    },
    movies(state) {
      return state.movies;
    },
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    LOGOUT(state) {
      state.token = null;
      state.username = null;
    },
    SAVE_TOKEN(state, { token, username }) {
      state.token = token;
      state.username = username;
      router.push({ name: "HomeView" });
    },
  },
  actions: {
    fetchMovies({ commit }) {
      axios
        .get("http://127.0.0.1:8000/tmdb/movies/")
        .then((response) => {
          const movies = response.data;
          commit("SET_MOVIES", movies);
        })
        .catch((error) => {
          console.error("Failed to fetch movies:", error);
        });
    },
    signUp(context, payload) {
      const username = payload.username;
      const password1 = payload.password1;
      const password2 = payload.password2;

      axios
        .post(`${API_URL}/accounts/signup/`, {
          username,
          password1,
          password2,
        })
        .then((res) => {
          context.commit("SAVE_TOKEN", { token: res.data.key, username });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login(context, payload) {
      const username = payload.username;
      const password = payload.password;

      axios
        .post(`${API_URL}/accounts/login/`, {
          username,
          password,
        })
        .then((res) => {
          const username = res.data.username;
          context.commit("SAVE_TOKEN", { token: res.data.key, username });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout(context) {
      context.commit("LOGOUT");
      router.push({ name: "HomeView" });
    },
  },
});

export default store;
