<template>
  <div>
    <button @click="getMovies">Get Movies</button>
    <ul>
      <li v-for="movie in movies" :key="movie.id">{{ movie.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: [],
    };
  },
  methods: {
    getMovies() {
      this.$http
        .get("http://127.0.0.1:8000/tmdb/movies/")
        .then((response) => {
          this.movies = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>