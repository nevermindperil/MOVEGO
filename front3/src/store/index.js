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
    // 로그인 상태를 반환하는 getter
    isLogin: (state) => {
      return state.token ? true : false;
    },
    // 주어진 ID에 해당하는 영화를 반환하는 getter입니다.
    movies: (state) => {
      return state.movies;
    },
    getMovieById: (state) => (id) => {
      return state.movies.find((movie) => movie.id === id);
    },
    username: (state) => {
      return state.username;
    },
  },
  mutations: {
    // 토큰과 사용자명을 저장하는 mutation
    SAVE_TOKEN(state, { token, username }) {
      state.token = token;
      state.username = username;
    },
    // 로그아웃하는 mutation입니다.
    LOGOUT(state) {
      state.token = null;
      state.username = null;
    },
    // // 영화 목록을 설정하는 mutation입니다.
    // SET_MOVIES(state, movies) {
    //   state.movies = movies;
    // },
  },

  actions: {
    fetchMovieById({ commit }, movieId) {
      return axios
        .get(`${API_URL}/movies/${movieId}`)
        .then((response) => {
          const movie = response.data; // API 응답에서 영화 데이터 추출
          commit("SET_MOVIES", [movie]); // 스토어의 SET_MOVIES 뮤테이션을 호출하여 영화 데이터를 업데이트
          return movie;
        })
        .catch((error) => {
          console.error("Failed to fetch movie:", error);
          throw error; // 에러를 다시 던져서 상위 호출자에게 전달
        });
    },

    signUp(context, payload) {
      // payload에서 사용자명과 비밀번호 정보를 추출
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
          // 회원가입 성공 시 응답에서 토큰과 사용자명을 추출
          const token = res.data.key;
          const username = res.data.username;
          // 저장된 토큰과 사용자명을 상태 관리(store)의 mutations을 호출하여 저장합니다.
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
      console.log("Login request:", username, password); // 로그인 요청 데이터 확인
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
          console.log(err); // 로그인 에러 확인
        });
    },

    logout(context) {
      context.commit("LOGOUT");
      router.push({ name: "HomeView" });
    },
  },
});

export default store;
