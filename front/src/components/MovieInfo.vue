<template>
  <!-- 영화 정보 컨테이너 -->
  <div class="movie-info-container" v-if="movie">
    <!-- 정보 헤더 -->
    <div class="infoHeader">
      <!-- 영화 포스터 이미지 -->
      <img :src="posterUrl" alt="영화 포스터" />
      <div class="infoHeaderText">
        <!-- 영화 제목 -->
        <h1>{{ movie.title }}</h1>
        <!-- 영화 장르 -->
        <span class="release_date">{{ movieGenre }}</span>
        <!-- 영화 배우 -->
        <p class="release_date">{{ movieActor }}</p>
        <!-- 영화 개봉일 -->
        <p class="release_date">{{ movie.release_date }}</p>
        <br />

        <!-- 영화 평균 평점 -->
        <p class="vote_average">
          평균 ★{{ movie.vote_average }} ({{ movie.vote_count }}명)
        </p>
      </div>
    </div>
    <hr />
    <br />

    <!-- 줄거리 -->
    <h3 style="font-weight: bold">줄거리</h3>
    <p>{{ movie.overview }}</p>
    <hr />
    <br />

    <!-- 예고편 -->
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
      // 라우트 파라미터에서 영화 ID를 가져와서 해당 ID의 영화 정보를 반환합니다.
      return this.getMovieById(Number(this.$route.params.id));
    },
    posterUrl() {
      // 영화 포스터 이미지 URL을 생성합니다.
      return this.movie?.poster_path
        ? `https://image.tmdb.org/t/p/original/${this.movie.poster_path}`
        : "";
    },
    movieGenre() {
      // 영화 장르를 문자열로 조합하여 반환합니다.
      return this.movie?.genres?.map((genre) => genre.name).join("・ ") || "";
    },
    movieActor() {
      // 영화 배우를 문자열로 조합하여 반환합니다.
      return this.movie?.actors?.map((actor) => actor.name).join("・ ") || "";
    },
    youtubeUrl() {
      // YouTube 예고편 URL을 생성합니다.
      return this.getYouTubeUrl(this.movie?.youtube_key);
    },
  },

  methods: {
    fetchMovie() {
      // 영화 정보를 가져오는 액션을 호출하여 영화를 가져옵니다.
      const movieId = Number(this.$route.params.id);
      this.$store.dispatch("fetchMovieById", movieId).catch((error) => {
        console.error("영화를 가져오는 데 실패했습니다:", error);
      });
    },
    getYouTubeUrl(youtubeKey) {
      // YouTube 예고편 URL을 생성합니다.
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

