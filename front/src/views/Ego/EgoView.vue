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
    const isLoggedIn = store.getters.isLogin;

    if (!isLoggedIn) {
      // 로그아웃된 상태인 경우 경고창을 표시하고 리디렉션
      const result = confirm(
        "로그인이 필요합니다! 로그인 페이지로 이동하시겠습니까?"
      );
      if (result) {
        next("/login"); // 로그인 페이지 경로로 리디렉션
      } else {
        next(false); // 페이지 진입을 취소하여 경로 변경하지 않음
      }
    } else {
      next(); // 로그인된 상태인 경우 페이지 진입 허용
    }
  },
};
</script>

<style>
/* Ego 페이지 스타일 */
</style>
