<template>
  <!-- <div class="col"> -->
  <div class="card">
    <div class="card-img-top">
      <img :src="posterUrl" alt="영화 포스터" />
      <div class="overlay">
        <h5 class="card-title" style="color: white">{{ movie.title }}</h5>
      </div>
    </div>
    <div class="card-body">
      <!-- <p class="card-tex text-truncate">{{ movie.overview }}</p> -->
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
};
</script>

<style scoped>
.card {
  position: relative;
  border: none;
  border-radius: 10px;
  overflow: hidden;
  width: 200px;
  height: 400px;
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
