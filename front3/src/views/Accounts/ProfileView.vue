<template>
  <div class="profile-view">
    <h1>프로필</h1>
    <p>사용자 이름: {{ username }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
const API_URL = "http://127.0.0.1:8000";

export default {
  name: "ProfileView",

  computed: {
    ...mapGetters(["username"]),
  },

  mounted() {
    this.fetchUserInfo(); // 로그인한 사용자 정보를 가져오는 액션 호출
  },
  methods: {
    fetchUserInfo() {
      // 사용자 정보를 가져오는 API 호출 등의 비동기 로직 수행
      // 예시로 axios를 사용하여 API 호출하는 코드를 작성했습니다.
      axios
        .get(`${API_URL}/user/info`)
        .then((response) => {
          const userInfo = response.data;
          // 가져온 사용자 정보를 처리하고 필요한 데이터를 store에 저장하는 로직
          // 예시로 store의 SAVE_USER_INFO 뮤테이션을 호출하여 store에 사용자 정보를 저장하도록 했습니다.
          this.$store.commit("SAVE_USER_INFO", userInfo);
        })
        .catch((error) => {
          console.error("Failed to fetch user info:", error);
        });
    },
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
