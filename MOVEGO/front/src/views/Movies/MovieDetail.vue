<template>
  <div v-if="movie">
    <h1>{{ movie.title }}</h1>
    <p>Release Date: {{ movie.release_date }}</p>
    <p>Popularity: {{ movie.popularity }}</p>
    <p>Vote Count: {{ movie.vote_count }}</p>
    <p>Vote Average: {{ movie.vote_average }}</p>
    <p>Overview: {{ movie.overview }}</p>
    <img :src="posterUrl" alt="Movie Poster" />
    <p>YouTube Key: {{ movie.youtube_key }}</p>

    <h2>Comments</h2>
    <movie-comment></movie-comment>
  </div>
</template>

<script>
import MovieComment from "@/components/MovieComment.vue";
import { mapGetters } from "vuex";

export default {
  name: "MovieDetail",
  components: {
    MovieComment,
  },
 computed: {
  ...mapGetters(["getMovieById"]),
  movie: {
    get() {
      return this.getMovieById(this.$route.params.id);
    },
    set() {
      // computed property인 movie에 값을 할당하려는 시도를 방지하기 위해 빈 setter를 구현합니다.
      // 값을 직접 변경해야 하는 경우에는 mutations나 actions를 사용해야 합니다.
    },
  },
    posterUrl() {
      if (this.movie && this.movie.poster_path) {
        return `https://image.tmdb.org/t/p/original/${this.movie.poster_path}`;
      }
      return "";
    },
  },
  created() {
  this.fetchMovie();
},

methods: {
  fetchMovie() {
    const movieId = this.$route.params.id;
    this.$store
      .dispatch("fetchMovieById", movieId)
      .then((fetchedMovie) => {
        this.movie = fetchedMovie;
      })
      .catch((error) => {
        console.error("Failed to fetch movie:", error);
      });
  },
},


};
</script>
