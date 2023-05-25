<template>
  <footer>
    <!-- 3. 본인 이름 작성 -->
    <div style="font-size: 13px">
      <div style="text-align: center; margin-top: 20px; color: grey">
        <span style="padding-top: 5px; padding-bottom: 2px">MOV;GO</span>
        <span style="padding-bottom: 2px; margin-left: 15px"
          >SSAFY 9기 대전1반</span
        >
        <div class="name" style="margin-left: 15px; font-size: 15px">
          권기연 | 송원규
        </div>
        <div style="padding-top: 2px; padding-bottom: 10px">
          © 2023 All Rights Reserved.
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FootBar",
  data() {
    return {};
  },
};
</script>

<style scoped>
.name {
  color: silver;
  border-radius: 5px;
  display: inline-block;
}

@keyframes hue-rotate {
  to {
    filter: hue-rotate(90deg);
  }
}
</style>