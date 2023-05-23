<template>
  <div class="MoviesView">
    <hr />
    <hr />
    hr
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

<style>
.content-container {
  background-color: black;
}
.additional-content {
  background-color: black;
}
</style>
