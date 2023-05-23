<template>
  <div>
    <h1>여긴 무비디테일뷰</h1>
    <MovieInfo />
    <MovieReview />
  </div>
</template>

<script>
import MovieInfo from "@/components/MovieInfo.vue";
import MovieReview from "@/components/MovieReview.vue";

export default {
  name: "MovieDetail",
  components: {
    MovieInfo,
    MovieReview,
  },
  data() {},
};
</script>

<style scoped>
h1 {
  color: white;
}
</style>