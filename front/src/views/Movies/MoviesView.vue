<template>
  <div>
    <h1>Movie List</h1>
    <hr />
    <MovieList />
  </div>
</template>

<script>
import MovieList from "@/components/MovieList.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MovieListView",
  components: {
    MovieList,
  },
  computed: {
    ...mapGetters(["movies"]),
  },
  methods: {
    ...mapActions(["fetchMovies"]),
  },
  created() {
    this.fetchMovies();
  },
};
</script>

<style></style>
