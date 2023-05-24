<template>
  <div class="MovieReview">
    <h1>영화리뷰</h1>
  </div>
</template>


<script>
export default {
  name: "MovieReview",
  data() {
    return {};
  },

  methods: {},
};
</script>

<style scoped>
.MovieReview {
  padding: 20px;
  border: 1px solid #ccc;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 5px;
}
</style>
