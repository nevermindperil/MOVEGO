
<template>
  <div class="MovieComments">
    <h1>영화 리뷰</h1>
    <form @submit.prevent="submitComment">
      <textarea v-model="comment" placeholder="코멘트를 입력하세요"></textarea>
      <button type="submit">작성</button>
      <p v-if="error" class="error">{{ error }}</p>
      <!-- 에러 메시지 출력 -->
    </form>
    <MovieCommentList :movieId="movieId" />
  </div>
</template>
<script>
import MovieCommentList from "@/components/MovieCommentList.vue";
import axios from "axios";

export default {
  name: "MovieComments",
  components: {
    MovieCommentList,
  },
  data() {
    return {
      movieId: null,
      comment: "",
      comments: [],
      error: null, // 에러 메시지를 저장할 변수 추가
    };
  },
  created() {
    this.movieId = this.$route.params.movie_pk;
    this.fetchComments();
  },

  methods: {
    submitComment() {
      axios
        .post(`/movies/${this.movieId}/comments/create/`, {
          content: this.comment,
        })
        .then((response) => {
          console.log("Comment created:", response.data);
          this.comment = "";
          this.fetchComments();
        })
        .catch((error) => {
          console.error("Error creating comment:", error);
          this.error = "코멘트 작성 중 오류가 발생했습니다."; // 에러 메시지 저장
        });
    },
    fetchComments() {
      axios
        .get(`/movies/${this.movieId}/comments/`)
        .then((response) => {
          this.comments = response.data;
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
          this.error = "코멘트를 불러오는 중 오류가 발생했습니다."; // 에러 메시지 저장
        });
    },
  },
};
</script>


<style scoped>
.error {
  color: red;
  margin-top: 5px;
}
</style>
