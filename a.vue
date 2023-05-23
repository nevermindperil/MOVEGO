<template>
  <div class="app-container">
    <div class="home-container">
      <div class="contents-container">
        <!-- 유튜브 api 구현 -->

        <!-- top_rated_movie -->
        <div class="wrapper">
          <swiper :options="swiperOptions" ref="swiper">
            <template v-for="movie in topRated">
              <swiper-slide :key="movie.id">
                <TopRatedHCard :movie="movie" />
              </swiper-slide>
            </template>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import UpComingHCard from "@/components/UpComingHCard";
import TopRatedHCard from "@/components/TopRatedHCard";
import axios from "axios";
import { mapState, mapGetters } from "vuex";

// import "swiper/dist/css/swiper.css";
import "swiper/swiper-bundle.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "HomeView",
  components: {
    // UpComingHCard,
    TopRatedHCard,

    swiper,
    swiperSlide,
  },

  data() {
    return {
      videos: [],
      swiperOptions: {
        slidesPerView: 6,
        slidesPerGroup: 6,
        spaceBetween: 20,

        loop: true, // 데이터가 끝까지 다읽으면 처음으로 돌아옴
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          1400: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          1190: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          980: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          780: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          550: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          150: {
            slidesPerView: 1,
          },
          0: {
            slidesPerView: 1,
          },
        },
        speed: 1000, // 넘김 속도 (단위: 밀리초)
      },
    };
  },
  mounted() {
    this.getVideos();
  },
  computed: {
    ...mapGetters(["topRated"]),
    ...mapState(["top_rated_movies"]),

    // ...mapGetters(["topRated1", "topRated2", "topRated3"]),
    // ...mapGetters(["upComing1", "upComing2", "upComing3"]),
  },
  methods: {
    async getVideos() {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              part: "snippet",
              chart: "mostPopular",
              maxResults: 1,
              key: "AIzaSyAV_SvBR49eSF26yQGTJ2E4vFYh5bi1H2o", // Replace with your actual API key
            },
          }
        );

        this.videos = response.data.items;
      } catch (error) {
        console.error(error);
      }
    },
    moveSwiperNext() {
      this.$refs.swiper.swiper.slideNext(1, false);
    },
    moveSwiperPrev() {
      this.$refs.swiper.swiper.slidePrev(1, false);
    },
  },
};
</script>

<style>
/* wrapper /
.contents-container {
  margin-left: 300px;
  margin-right: 300px;
}

.home-container {
  background-color: black;
  width: 100%;
  height: auto;
  margin: 0;
}

h3 {
  background: black;
}

/ ===============이미지 그리고 그안에 텍스트 들어갈것=========== /

.todetail {
  width: 100%;
  height: auto;
  margin-bottom: 100px;
  position: relative;
}

.todetail img {
  width: 100%;
}

.text1 {
  position: absolute;
  top: 40;
  right: 70px;
  font-size: 5em;
  color: white;
}

.text2 {
  position: absolute;
  top: 100px;
  right: 220px;
  font-size: 2em;
  color: white;
}
.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%; / 왼쪽 부분만 적용하므로 너비를 50%로 설정 /
  height: 100%;
  background: linear-gradient(to left, transparent, black 100%);

  background-size: cover;
  opacity: 1;
}

/=======카드 */
.card-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 0 20px;
  gap: 20px;
}

.fa-light fa-circle-play {
  width: 1000px;
}

.app-container {
  width: 100%;

  max-width: auto;
  margin: 0 auto;
  height: 100vh;
  overflow-y: auto;
}

@media (min-width: 768px) {
  .contents-container {
    margin-left: 50px;
    margin-right: 50px;
  }
}

@media (min-width: 992px) {
  .contents-container {
    margin-left: 300px;
    margin-right: 300px;
  }
}

@media (max-width: 576px) {
  .contents-container {
    margin: 0;
  }
}
</style>
