import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import router from "../router";

const API_URL = "http://127.0.0.1:8000";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {},
  plugins: [createPersistedState()],
  state: {
    movies: [],
    token: null,
    username: null,
  },
  getters: {
    // 로그인 상태를 반환하는 getter입니다.
    isLogin: (state) => {
      return state.token ? true : false;
    },

    // 모든 영화 목록을 반환하는 getter입니다.
    movies: (state) => {
      return state.movies;
    },

    // 주어진 ID에 해당하는 영화를 반환하는 getter입니다.
    getMovieById: (state) => (id) => {
      return state.movies.find((movie) => movie.id === id);
    },
  },

  mutations: {
    // 영화 목록을 설정하는 mutation입니다.
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },

    // 토큰과 사용자명을 저장하는 mutation입니다.
    SAVE_TOKEN(state, { token, username }) {
      state.token = token;
      state.username = username;
    },

    // 로그아웃하는 mutation입니다.
    LOGOUT(state) {
      state.token = null;
      state.username = null;
    },
  },

  actions: {
    fetchMovies({ commit }) {
      return axios
        .get(`${API_URL}/tmdb/movies/`)
        .then((response) => {
          const movies = response.data;
          commit("SET_MOVIES", movies);
        })
        .catch((error) => {
          console.error("Failed to fetch movies:", error);
          throw error; // 오류를 다시 던져서 상위 호출자에게 전달
        });
    },

    fetchMovieById({ commit }, movieId) {
      return axios
        .get(`${API_URL}/movies/${movieId}`)
        .then((response) => {
          const movie = response.data; // API 응답에서 영화 데이터 추출
          commit("SET_MOVIES", [movie]); // 스토어의 SET_MOVIES 뮤테이션을 호출하여 영화 데이터를 업데이트
          return movie; // 가져온 영화 객체 반환
        })
        .catch((error) => {
          console.error("Failed to fetch movie:", error); // 영화 데이터 가져오기 실패 시 에러 메시지 출력
          throw error; // 에러를 다시 던져서 상위 호출자에게 전달
        });
    },

    signUp(context, payload) {
      // payload에서 사용자명과 비밀번호 정보를 추출합니다.
      const username = payload.username;
      const password1 = payload.password1;
      const password2 = payload.password2;

      // 서버에 회원가입 요청을 보내고 응답을 처리합니다.
      axios
        .post(`${API_URL}/accounts/signup/`, {
          username,
          password1,
          password2,
        })
        .then((res) => {
          // 회원가입 성공 시 응답에서 토큰과 사용자명을 추출합니다.
          const token = res.data.key;
          const username = res.data.username;

          // 저장된 토큰과 사용자명을 상태 관리(store)의 mutations을 호출하여 저장합니다.
          context.commit("SAVE_TOKEN", { token, username });

          // HomeView로 이동합니다.
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

    deleteAccount(context) {
      const username = context.state.username; // Vuex의 상태에서 username 값을 가져옵니다.

      // 삭제 요청을 보낼 API 엔드포인트 URL
      const url = `http://127.0.0.1:8000/accounts/${username}/`;

      // 삭제 요청 보내기
      axios
        .delete(url, {
          headers: {
            Authorization: `Token ${context.state.token}`,
          },
        })
        .then(() => {
          // 삭제 성공 시 처리할 로직
          console.log("계정이 성공적으로 삭제되었습니다.");
          // 회원 탈퇴 후 필요한 작업 수행
          context.dispatch("logout");
          router.push({ name: "HomeView" });
        })
        .catch((error) => {
          // 삭제 실패 시 처리할 로직
          console.error("계정 삭제 실패:", error);
        });
    },
  },
});

export default store;
