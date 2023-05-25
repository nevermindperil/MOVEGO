<template>
  <div class="movie-info-container" v-if="movie">
    <div class="infoHeader">
      <img :src="posterUrl" alt="Movie Poster" />
      <div class="infoHeaderText">
        <h1>{{ movie.title }}</h1>
        <span class="release_date">{{ movieGenre }}</span>
        <p class="release_date">{{ movieActor }}</p>
        <p class="release_date">{{ movie.release_date }}</p>
        <br />

        <p class="vote_average">
          평균 ★{{ movie.vote_average }} ({{ movie.vote_count }}명)
        </p>
      </div>
    </div>
    <hr />
    <br />
    <h3 style="font-weight: bold">줄거리</h3>
    <p>{{ movie.overview }}</p>
    <hr />
    <br />
    <h3 style="font-weight: bold">예고편</h3>
    <iframe
      width="100%"
      height="100%"
      :src="youtubeUrl"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MovieInfo",
  computed: {
    ...mapGetters(["getMovieById"]),
    movie() {
      return this.getMovieById(Number(this.$route.params.id));
    },
    posterUrl() {
      return this.movie?.poster_path
        ? `https://image.tmdb.org/t/p/original/${this.movie.poster_path}`
        : "";
    },
    movieGenre() {
      return this.movie?.genres?.map((genre) => genre.name).join("・ ") || "";
    },
    movieActor() {
      return this.movie?.actors?.map((actor) => actor.name).join("・ ") || "";
    },
    youtubeUrl() {
      return this.getYouTubeUrl(this.movie?.youtube_key);
    },
  },

  methods: {
    fetchMovie() {
      const movieId = Number(this.$route.params.id);
      this.$store.dispatch("fetchMovieById", movieId).catch((error) => {
        console.error("Failed to fetch movie:", error);
      });
    },
    getYouTubeUrl(youtubeKey) {
      return youtubeKey ? `https://www.youtube.com/embed/${youtubeKey}` : "";
    },
  },
};
</script>

<style scoped>
.movie-info-container {
  height: fit-content;
  background-color: #fff;
  width: 45%; /* 원하는 너비 값으로 수정 */
  padding: 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-right: 100px;
}

.movie-info-container iframe {
  max-width: 100%;
  height: 400px;
}

.movie-info-container img {
  width: 150px;
  border-radius: 8px;
  margin-right: 25px;
}

.infoHeader {
  display: flex;
  margin-bottom: 30px;
}

.infoHeaderText .release_date {
  color: rgb(163, 162, 162);
}
.infoHeaderText :first-child {
  font-weight: bold;
}
.vote_average {
  font-size: 20px;
}
</style>
