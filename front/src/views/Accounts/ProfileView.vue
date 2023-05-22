<template>
  <div>
    <h1>프로필</h1>
    <p>사용자 이름: {{ username }}</p>
  </div>
</template>

<script>
export default {
  name: "ProfileView",
  computed: {
    username() {
      return this.$store.state.username;
    },
  },
};
</script>

<style></style>
