import axios from "axios";
const API_URL = "http://127.0.0.1:8000/tmdb/movies/";
export default {
  state: {
    movies: [],
    pageNum: 1,
  },
  getters: {
    movies: (state) => state.movies,
    pageNum: (state) => state.pageNum,
  },
  mutations: {
    SET_MOVIES: (state, movies) => (state.movies = movies),
  },
  actions: {
    fetchMovies({ commit, getters }) {
      axios({
        method: "get",
        url: `${API_URL}`,
        params: {
          page: getters.pageNum,
        },
      }).then((res) => {
        console.log(res);
        commit("SET_MOVIES", res.data.movies);
      });
    },
  },
};
