<template>
  <div>
    <div class="reviewWrap">
      <h3 class="title">코멘트</h3>
      <hr />
      <div v-for="review in reviews" :key="review.id" class="review-item">
        <p class="username" style="font-size: 13px">
          {{ review.user.username }}
        </p>
        <hr />
        <p class="content">{{ review.content }}</p>
        <div v-if="review.user.id === userpk" class="buttons">
          <button
            @click.prevent="updateReview(review)"
            class="btn btn-secondary btn-sm"
          >
            수정
          </button>
          <button
            @click.prevent="deleteReview(review)"
            class="btn btn-danger btn-sm"
          >
            삭제
          </button>
        </div>
      </div>

      <form class="review-form">
        <div class="input-group">
          <input
            type="text"
            v-model="review_content"
            placeholder=""
            class="form-control rounded-input"
          />
          <div class="input-group-append">
            <button @click.prevent="reviewCreate" class="btn btn-primary">
              등록
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MovieComments",
  props: {
    movie: {
      type: Object,
      required: true,
    },
    movieId: {
      type: String, // 적절한 타입으로 설정해야 합니다.
      required: true, // 필수 프롭인 경우 required 옵션을 추가합니다.
    },
  },
  data() {
    return {
      userName: "",
      userpk: null,
      reviews: [],
      token: null,
      review_content: "",
    };
  },
  created() {
    this.currentUser();
    this.getReviews();
  },
  computed: {
    // ...mapState(["token"]), // Vuex의 token 상태를 computed 속성에 추가
  },
  methods: {
    currentUser() {
      const token = this.$store.state.token;
      console.log(token);
      axios
        .get("http://127.0.0.1:8000/accounts/user/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          this.userpk = response.data.pk;
          this.userName = response.data.username;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getReviews() {
      axios({
        method: "get",
        url: `http://127.0.0.1:8000/tmdb/movies/reviews/${this.movieId}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          this.reviews = res.data;
          console.log(this.reviews);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    reviewCreate() {
      const reviewItem = {
        content: this.review_content,
      };
      if (reviewItem) {
        axios({
          method: "post",
          url: `http://127.0.0.1:8000/tmdb/movies/${this.movieId}/reviews/`,
          data: reviewItem,
          headers: {
            Authorization: `Token ${this.$store.state.token}`,
          },
        })
          .then(() => {
            console.log("----------성공------------");
            this.review_content = "";
            this.getReviews();
          })
          .catch((err) => {
            console.log("----------실패------------");
            console.log(err);
          });
      }
    },
    updateReview(review) {
      const reviewItem = {
        content: this.review_content,
      };
      axios({
        method: "put",
        url: `http://127.0.0.1:8000/tmdb/reviews/${review.id}/`,
        data: reviewItem,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          console.log(res);
          this.review_content = "";
          this.getReviews();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteReview(review) {
      axios({
        method: "delete",
        url: `http://127.0.0.1:8000/tmdb/reviews/${review.id}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          console.log(res);
          this.getReviews();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.reviewWrap {
  background-color: white;
  border-radius: 7px;
  padding: 30px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px 0px;
}

.title {
  font-weight: bold;
}

.review-item {
  margin-bottom: 20px;
  background-color: silver;
}

.username {
  font-size: 17px;
  font-weight: bold;
}

.content {
  margin-top: 10px;
}

.buttons {
  margin-top: 10px;
}

.rounded-input {
  border-radius: 20px;
  padding: 5px 10px;
}

.btn-sm {
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
}
</style>
