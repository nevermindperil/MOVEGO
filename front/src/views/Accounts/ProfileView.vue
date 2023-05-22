<template>
  <div>
    <h1>프로필</h1>
    <p>사용자 이름: {{ username }}</p>
  </div>
</template>

<script>
export default {
  name: "ProfileView",
  created() {
    // URL 파라미터에서 사용자 이름 가져오기
    this.username = this.$route.params.username;
  },
  data() {
    return {
      username: "",
    };
  },
};
</script>

<style></style>
