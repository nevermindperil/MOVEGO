<template>
  <div class="MovieCommentList">
    <h2>코멘트 목록</h2>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        {{ comment.content }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MovieCommentList",
  props: {
    movieId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
    };
  },
  created() {
    this.fetchComments();
  },
  methods: {
    fetchComments() {
      axios
        .get(`/api/movies/${this.movieId}/comments/`)
        .then((response) => {
          this.comments = response.data;
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    },
  },
};
</script>
