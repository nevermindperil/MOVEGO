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
      console.log("A", state.username);
      state.username = username;
      console.log("B", state.username);
      console.log("Stored username:", state.username); // username 저장 확인
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
          const token = res.data.key;
          const username = res.data.username;
          console.log("----", token, username);
          console.log("Received response:", res.data);
          console.log("Username:", res.data.username);
          context.commit("SAVE_TOKEN", {
            token: res.data.key,
            username: res.data.username,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // login 액션
    // Vue의 login 액션
    // Vue의 login 액션
    login(context, payload) {
      const username = payload.username;
      const password = payload.password;

      console.log("Login request:", username, password); // 로그인 요청 데이터 확인

      axios
        .post(`${API_URL}/accounts/login/`, {
          username,
          password,
        })
        .then((res) => {
          console.log("Received response:", res.data);
          console.log("Data structure:", res.data);

          context.commit("SAVE_TOKEN", {
            token: res.data.key,
            username: payload.username,
          });
        })
        .catch((err) => {
          console.log("Login error:", err); // 로그인 에러 확인
        });
    },

    logout(context) {
      context.commit("LOGOUT");
      router.push({ name: "HomeView" });
    },
    // profile(context) {
    //   const username = context.state.username;
    //   if (username) {
    //     const profileUrl = `/profile/${username}`;
    //     console.log("Profile URL:", profileUrl); // 프로필 URL 확인
    //     router.push({ path: profileUrl });
    //   } else {
    //     console.log("Username is undefined");
    //   }
    // },
  },
});

export default store;
