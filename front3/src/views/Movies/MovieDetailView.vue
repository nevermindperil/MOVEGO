<template>
  <div class="MovieDetailPage">
    <MovieInfo />
    <MovieComments />
  </div>
</template>

<script>
import MovieInfo from "@/components/MovieInfo.vue";
import MovieComments from "@/components/MovieComments.vue";

export default {
  name: "MovieDetail",
  components: {
    MovieInfo,
    MovieComments,
  },
  data() {
    return {
      movieId: null,
    };
  },
  created() {
    // 현재 경로의 파라미터에서 영화 ID를 가져와 movieId에 저장
    this.movieId = this.$route.params.id;
  },
};
</script>

<style scoped>
h1 {
  color: white;
}
.MovieDetailPage {
  padding: 80px;
  display: flex;
}
</style>
