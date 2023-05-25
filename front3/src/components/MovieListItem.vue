<template>
  <!-- <div class="col"> -->
  <!-- 1. MovieListItem.vue 파일에서 클릭 이벤트를 추가합니다. div 요소에 @click 속성을 추가하고, 클릭 이벤트 핸들러 메서드를 호출합니다. 예를 들어, goToMovieDetail 메서드를 호출하도록 합니다. -->
  <div class="card" @click="goToMovieDetail">
    <div class="card-img-top">
      <img :src="posterUrl" alt="영화 포스터" />
      <div class="overlay">
        <h5 class="card-title" style="color: white">{{ movie.title }}</h5>
      </div>
    </div>
  </div>
  <!-- </div> -->
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
  // 2. MovieListItem.vue 파일의 <script> 태그에 goToMovieDetail 메서드를 추가합니다. 이 메서드는 영화 상세 페이지로 이동하는 역할을 합니다. this.$router.push()를 사용하여 영화 상세 페이지로 이동합니다. this.movie.id를 이용하여 해당 영화의 ID를 동적으로 전달합니다.
  methods: {
    goToMovieDetail() {
      this.$router.push({ name: "MovieDetail", params: { id: this.movie.id } });
    },
  },
};
</script>

<style scoped>
.card {
  position: relative;
  border: none;
  border-radius: 10px;
  overflow: hidden;
  width: 200px;
  height: 380px;
}

.card-img-top {
  position: relative;
  overflow: hidden;
}

.card-img-top img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.card-img-top:hover img {
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.card:hover .overlay {
  opacity: 1;
  pointer-events: auto;
}

.card-body {
  padding: 1rem;
  text-align: center;
  color: #fff;
}

.card-title {
  margin-bottom: 0;
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
