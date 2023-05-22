<template>
  <!-- 네브바에 stick-top을 넣을지 말지 결정 : 고정 버튼 없다면 있는게 나을 듯 함-->
  <footer>
    <!-- 3. 본인 이름 작성 -->
    <div style="font-size: 13px">
      <div style="text-align: center; margin-top: 20px; color: grey">
        <div style="padding-top: 5px; padding-bottom: 2px">MOV;GO</div>
        <div style="padding-bottom: 2px">SSAFY 9기 대전1반</div>
        <div class="name" style="width: 12.5%; font-size: 15px">
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