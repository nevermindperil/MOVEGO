<template>
  <div class="egoExpand">
    <h1>egoExpand페이지</h1>
  </div>
</template>

<script>
export default {
  name: "EgoExpandView",
  mounted() {
    this.$parent.isHomePage = false;
  },
};
</script>

<style>
</style>