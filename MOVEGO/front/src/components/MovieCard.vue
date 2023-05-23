<template>
  <div>
    <div class="card">
      <img
        v-bind:src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"
        class="card-img-top"
        alt="image"
      />
      <div class="card-body">
        <h5 class="card-title">{{ movie.title }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieCard",
  props: {
    movie: Object,
  },
};
</script>

<style>
</style>
