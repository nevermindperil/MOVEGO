<template>
  <div class="EgoExpandIntro">
    <span class="bgText">
      <span class="selectText">영화</span
      >와관련된질문에답하고자신의영화EGO를찾아보세요영화와관련된<span
        class="selectText"
        >질문</span
      >에답하고자신의영화<span class="selectText">EGO</span
      >를찾아보세요영화와관련된질문에<span class="selectText">답</span
      >하고자신의즐겁다!를찾아보세요EGO를찾아보세요영화와관련된질문에<span
        class="selectText"
        >답</span
      >하고자신의영화EGO를찾아보세요<span class="selectText">영화</span
      >와배고프다
    </span>
    <div class="EgoExpand">
      <button class="floating-button">
        <router-link to="/" class="nav-link">에고확장하기</router-link>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EgoExpandIntro",
};
</script>

<style>
.EgoExpandIntro {
  background-color: orangered;
  height: 100vh;
}

.bgText {
  font-size: 100px;
  font-weight: bold;
}

.selectText {
  color: white;
}

.EgoExpand {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.floating-button {
  position: relative;
  z-index: 1;
  background-color: white;
  border: none;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
}

.floating-button:hover {
  background-color: lightgray;
}
</style>

