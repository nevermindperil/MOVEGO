<template>
  <div class="profile-view">
    <h1>프로필</h1>
    <p>사용자 이름: {{ username }}</p>
    <button class="btn btn-danger" @click="deleteAccount">회원탈퇴</button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ProfileView",
  computed: {
    ...mapState(["username"]),
  },
  methods: {
    ...mapActions(["deleteAccount"]),
  },
};
</script>

<style scoped>
.profile-view {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
  height: 300px;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  margin-bottom: 10px;
}
</style>
