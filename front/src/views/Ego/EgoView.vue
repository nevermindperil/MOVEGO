<template>
  <div>
    <h1>에고</h1>
  </div>
</template>

<script>
import store from "../../store";

export default {
  name: "EgoView",
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const isLoggedIn = store.getters.isLogin;
      if (!isLoggedIn) {
        // 로그아웃된 상태인 경우 경고창을 표시하고 리디렉션
        const result = confirm(
          "로그인이 필요합니다! 로그인 페이지로 이동하시겠습니까?"
        );
        if (result) {
          vm.$router.push("/login"); // 로그인 페이지로 리디렉션
        } else {
          vm.$router.push(from.path); // 진입을 취소하고 이전 페이지로 돌아감
        }
      }
    });
  },
};
</script>

<style>
/* Ego 페이지 스타일 */
</style>
