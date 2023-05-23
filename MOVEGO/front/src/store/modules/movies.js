import axios from "axios";

const API_URL = "http://127.0.0.1:8000/tmdb/movies";

export default {
  state: {
    movies: [],
    pageNum: 1,
  },
  getters: {
    movies(state) {
      return state.movies;
    },
    getMovieById: (state) => (id) => {
      return state.movies.find((movie) => movie.id === id);
    },
    getMovieComments: (state) => (movieId) => {
      const movie = state.movies.find((movie) => movie.id === movieId);
      return movie ? movie.comments : [];
    },
    pageNum: (state) => state.pageNum,
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    SET_MOVIE_COMMENTS(state, { movieId, comments }) {
      const movie = state.movies.find((movie) => movie.id === movieId);
      if (movie) {
        movie.comments = comments;
      }
    },
    SET_MOVIE(state, movie) {
      state.movies.push(movie);
    },
  },
  actions: {
    fetchMovies({ commit }) {
      return axios
        .get(`${API_URL}/`)
        .then((response) => {
          const movies = response.data;
          commit("SET_MOVIES", movies);
        })
        .catch((error) => {
          console.error("Failed to fetch movies:", error);
        });
    },
    createComment({ commit }, payload) {
      const movieId = payload.movieId;
      const commentText = payload.comment.text;

      axios
        .post(`${API_URL}/${movieId}/comments/`, {
          movie: movieId,
          text: commentText,
        })
        .then(() => {
          commit("fetchMovieComments", movieId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchMovieComments({ commit }, movieId) {
      axios
        .get(`${API_URL}/${movieId}/comments/`)
        .then((response) => {
          const comments = response.data;
          commit("SET_MOVIE_COMMENTS", { movieId, comments });
        })
        .catch((error) => {
          console.error("Failed to fetch movie comments:", error);
        });
    },
    fetchMovieById({ commit }, movieId) {
      return axios
        .get(`${API_URL}/${movieId}/`)
        .then((response) => {
          const movie = response.data;
          commit("SET_MOVIE", movie);
          return movie; // movie 객체를 반환합니다.
        })
        .catch((error) => {
          console.error("Failed to fetch movie:", error);
          throw error;
        });
    },
  },


  
};
