<template>
  <div>
    <h1>Movie List</h1>
    <hr />
    <MovieList :movies="movies" @movie-clicked="showMovieDetail" />
  </div>
</template>

<script>
import MovieList from "@/components/MovieList.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MovieView",
  components: {
    MovieList,
  },
  computed: {
    ...mapGetters(["movies"]),
  },
  methods: {
    ...mapActions(["fetchMovies"]),
    showMovieDetail(movie) {
      // 해당 영화의 상세 정보 페이지로 이동
      this.$router.push({ name: "MovieDetail", params: { id: movie.id } });
    },
  },
  created() {
    this.fetchMovies();
  },
};
</script>

<style></style>
