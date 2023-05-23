<template>
  <div>
    <div class="horror">
      <h1 style="margin-left: 190px; font-weight: bold">
        #당신이 진정한 공포 도전자라면
      </h1>
      <swiper ref="filterSwiper" :options="swiperOption" role="tablist">
        <swiper-slide
          role="tab"
          v-for="(group, index) in movieGroups"
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

    <div class="horror">
      <h1 style="margin-left: 190px; font-weight: bold">
        #당신이 진정한 공포 도전자라면
      </h1>
      <swiper ref="filterSwiper" :options="swiperOption" role="tablist">
        <swiper-slide
          role="tab"
          v-for="(group, index) in movieGroups"
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

    <div class="horror">
      <h1 style="margin-left: 190px; font-weight: bold">
        #당신이 진정한 공포 도전자라면
      </h1>
      <swiper ref="filterSwiper" :options="swiperOption" role="tablist">
        <swiper-slide
          role="tab"
          v-for="(group, index) in movieGroups"
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
      const movieGroups = [];

      while (movies.length > 0) {
        movieGroups.push(movies.splice(0, groupSize));
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
</style>
