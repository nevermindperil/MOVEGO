<template>
  <div class="col">
    <div class="card"  @click="$emit('movie-clicked', movie)">
      <img :src="posterUrl" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{{ movie.title }}</h5>
        <p class="card-tex text-truncate">{{ movie.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieListItem",
  props: {
    movie: Object,
  },
  computed: {
    posterUrl() {
      return `https://image.tmdb.org/t/p/original/${this.movie.poster_path}`;
    },
  },
};
</script>

<style></style>
s