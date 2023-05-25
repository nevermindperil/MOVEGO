import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import router from "../router";

Vue.use(Vuex);

const API_URL = "http://127.0.0.1:8000";

const store = new Vuex.Store({
  modules: {},
  plugins: [createPersistedState()],
  state: {
    movies: [],
    token: null,
    username: null,
  },
  getters: {
    isLogin: (state) => {
      return state.token ? true : false;
    },
    movies: (state) => {
      return state.movies;
    },
    getMovieById: (state) => (id) => {
      return state.movies.find((movie) => movie.id === id);
    },
  },
  mutations: {
    SAVE_TOKEN(state, { token, username }) {
      state.token = token;
      state.username = username;
    },
    LOGOUT(state) {
      state.token = null;
      state.username = null;
    },
  },
  actions: {
    fetchMovieById({ commit }, movieId) {
      return axios
        .get(`${API_URL}/movies/${movieId}`)
        .then((response) => {
          const movie = response.data;
          commit("SET_MOVIES", [movie]);
          return movie;
        })
        .catch((error) => {
          console.error("Failed to fetch movie:", error);
          throw error;
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
          const token = res.data.key;
          const username = res.data.username;
          context.commit("SAVE_TOKEN", { token, username });
          router.push({ name: "HomeView" });
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
          const token = res.data.key;
          const username = res.data.username;
          context.commit("SAVE_TOKEN", { token, username });
          router.push({ name: "HomeView" });
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
