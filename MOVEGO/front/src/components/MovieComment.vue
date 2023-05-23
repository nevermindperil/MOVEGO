<template>
  <div>
    <h2>Comments</h2>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        {{ comment.text }}
      </li>
    </ul>

    <form @submit.prevent="submitComment">
      <input type="text" v-model="commentText" placeholder="Enter your comment" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MovieComment",
  computed: {
    ...mapGetters(["getMovieComments"]),
    comments() {
      const movieId = this.$route.params.id;
      return this.getMovieComments(movieId);
    },
  },
  data() {
    return {
      commentText: "", // 입력된 댓글 내용을 저장하는 데이터
    };
  },
  methods: {
    ...mapActions(["createComment"]),
    submitComment() {
      const movieId = this.$route.params.id;
      const comment = {
        text: this.commentText,
        // 필요한 경우 다른 댓글 관련 데이터도 추가
      };
      this.createComment({ movieId, comment })
        .then(() => {
          // 댓글 작성 후 추가적인 동작 수행
          this.commentText = ""; // 입력 필드 초기화
        })
        .catch((error) => {
          console.error("Failed to create comment:", error);
        });
    },
  },
};
</script>
