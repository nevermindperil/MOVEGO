<template>
  <div class="movie-trailer">
    <div class="trailer-container">
      <iframe
        v-if="trailerKey"
        :src="trailerUrl"
        width="100%"
        height="500px"
        frameborder="0"
        allowfullscreen
      ></iframe>
      <div v-else class="no-trailer-message">트레일러 영상이 없습니다.</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MovieTrailer',
  props: {
    movie: Object,
  },
  data() {
    return {
      trailerKey: '',
      trailerUrl: '',
    };
  },
  watch: {
    movie: {
      immediate: true,
      handler() {
        this.fetchTrailer();
      },
    },
  },
  methods: {
    fetchTrailer() {
      console.log(this.movie)
      if (this.movie && this.movie.id) {
        axios
          .get(`https://api.themoviedb.org/3/movie/${this.movie.id}/videos?api_key=e8a979cfe459982651dedf077569ac57`)
          .then((res) => {
            if (res.data && res.data.results.length > 0) {
              this.trailerKey = res.data.results[0].key;
              this.trailerUrl = `https://www.youtube.com/embed/${this.trailerKey}`;
            } else {
              this.trailerKey = '';
              this.trailerUrl = '';
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.trailerKey = '';
        this.trailerUrl = '';
      }
    },
  },
};
</script>

<style>
.movie-trailer {
  margin-top: 20px;
}

.movie-trailer iframe {
  border-radius: 10px; 
}

.trailer-container {
  position: relative;
}

.no-trailer-message {
  display: flex;
  justify-content: right;
  align-items: right;
  width: 100%;
  height: 500px;
  background-color: #f0f0f0;
  color: #666;
  font-size: 18px;
}
</style>
