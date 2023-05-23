<template>
  <div>
    <div class="genre1 genres">
      <h2 style="margin-left: 190px; font-weight: bold">
        모험과 사랑을 찾는 당신에게 !
      </h2>
      <swiper ref="filterSwiper1" :options="swiperOption" role="tablist">
        <swiper-slide
          role="tab"
          v-for="(group, index) in movieGroups.genre1Movies"
          :key="index"
        >
          <div class="movie-group">
            <MovieListItem
              v-for="movie in group"
              :key="movie.id"
              :movie="movie"
              class="movie-list-item col"
            />
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <div class="genre2 genres">
      <h2 style="margin-left: 190px; font-weight: bold">
        덕후가 세상을 지배한다. MOV;GO가 추천하는 애니메이션
      </h2>
      <swiper ref="filterSwiper2" :options="swiperOption" role="tablist">
        <swiper-slide
          role="tab"
          v-for="(group, index) in movieGroups.genre2Movies"
          :key="index"
        >
          <div class="movie-group">
            <MovieListItem
              v-for="movie in group"
              :key="movie.id"
              :movie="movie"
              class="movie-list-item col"
            />
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <div class="genre3 genres">
      <h2 style="margin-left: 190px; font-weight: bold">
        일주일동안 받은 스트레스 다 뽀개버려
      </h2>
      <swiper ref="filterSwiper3" :options="swiperOption" role="tablist">
        <swiper-slide
          role="tab"
          v-for="(group, index) in movieGroups.genre3Movies"
          :key="index"
        >
          <div class="movie-group">
            <MovieListItem
              v-for="movie in group"
              :key="movie.id"
              :movie="movie"
              class="movie-list-item col"
            />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import MovieListItem from "@/components/MovieListItem.vue";
import { mapGetters } from "vuex";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "MovieList",
  components: {
    MovieListItem,
    swiper,
    swiperSlide,
  },
  computed: {
    ...mapGetters(["movies"]),
    movieGroups() {
      const groupSize = 6; // 한 그룹에 표시할 영화 수
      const movies = [...this.movies]; // movies 배열을 복사하여 작업
      movies.sort((a, b) => b.popularity - a.popularity); // vote_average를 기준으로 내림차순 정렬

      const movieGroups = {
        genre1Movies: [],
        genre2Movies: [],
        genre3Movies: [],
      };

      while (movies.length > 0) {
        movieGroups.genre1Movies.push(movies.splice(0, groupSize));
        movieGroups.genre2Movies.push(movies.splice(0, groupSize));
        movieGroups.genre3Movies.push(movies.splice(0, groupSize));
      }
      return movieGroups;
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper-container {
  padding: 0 190px;
  //...중략
}

.movie-group {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; // 포스터가 잘리지 않도록 위쪽 정렬
}

.movie-list-item {
  width: calc(
    100% / 6
  ); // 각 영화 아이템의 너비를 1/6로 설정 (한 그룹에 6개의 영화가 표시되므로)
  max-width: 100%; // 최대 너비는 100%로 설정하여 화면을 넘지 않도록 함
}

.genres {
  margin-bottom: 50px;
}
</style>
