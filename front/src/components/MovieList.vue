<template>
  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
    <MovieListItem v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
</template>

<script>
import MovieListItem from "@/components/MovieListItem.vue";
import { mapGetters } from "vuex";
export default {
  name: "MovieList",
  components: { MovieListItem },
  computed: {
    ...mapGetters(["movies"]),
  },
};
</script>

<style></style>
