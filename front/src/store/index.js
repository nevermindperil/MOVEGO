import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import router from "../router";

const API_URL = "http://127.0.0.1:8000";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
  },
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
            username: payload.username,
          });

          router.push({ name: "HomeView" }); // 회원가입 완료 후 홈으로 이동
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
    // Vue 컴포넌트에서 계정 삭제 요청을 보내는 메서드
    deleteAccount(context) {
      const username = context.state.username; // Vuex의 상태에서 username 값을 가져옵니다.

      // 삭제 요청을 보낼 API 엔드포인트 URL
      const url = `http://127.0.0.1:8000/accounts/delete/${username}/`;

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
    }






    // deleteAccount(context) {

    //   // 일단 회원탈퇴 버튼 누르면 여기까지 옴.
    //   // console.log('여기오니?')

    //   // 계정 삭제 요청
    //   axios
    //     .delete(`${API_URL}/accounts/delete/`)
    //     .then(() => {
    //       // 계정 삭제 성공 시 로그아웃 처리하고 Home으로
    //       context.commit("LOGOUT");
    //       router.push({ name: "HomeView" });
    //     })
    //     .catch((error) => {
    //       console.error("계정 삭제 실패:", error);
    //     });
    // },
  },
});

export default store;
