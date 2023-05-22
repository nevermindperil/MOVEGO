import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
import router from '../router';

const API_URL = 'http://127.0.0.1:8000';

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    movies: [], // 영화 데이터를 저장할 배열
    token: null,
    username: null, // 유저 이름을 저장할 변수
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false;
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
      router.push({ name: 'HomeView' });
    },
  },
  actions: {
    fetchMovies({ commit }) {
      // API 요청을 보내고 영화 데이터를 가져와 상태를 업데이트하는 액션
      axios.get('http://127.0.0.1:8000/tmdb/movies/')
        .then(response => {
          const movies = response.data;
          commit('SET_MOVIES', movies);
        })
        .catch(error => {
          console.error('Failed to fetch movies:', error);
        });
    },
    getArticles(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/articles/`,
      })
        .then((res) => {
          context.commit('GET_ARTICLES', res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    signUp(context, payload) {
      const username = payload.username;
      const password1 = payload.password1;
      const password2 = payload.password2;

      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username,
          password1,
          password2,
        },
      })
        .then((res) => {
          context.commit('SAVE_TOKEN', { token: res.data.key, username });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login(context, payload) {
      const username = payload.username;
      const password = payload.password;

      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username,
          password,
        },
      })
        .then((res) => {
          const username = res.data.username; // 서버에서 받아온 유저의 이름
          context.commit('SAVE_TOKEN', { token: res.data.key, username });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

export default store;
