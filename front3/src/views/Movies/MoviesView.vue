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
import { mapGetters } from "vuex";

export default {
  name: "MovieListView",
  components: {
    MovieList,
  },
  computed: {
    ...mapGetters(["movies"]),
  },
};
</script>

<style>
.content-container {
  background-color: rgba(255, 255, 255, 0);
}
.additional-content {
  background-color: black;
}
</style>
