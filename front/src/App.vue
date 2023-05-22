<template>
  <div id="app">
    <div class="content-container">
      <nav-bar></nav-bar>
      <router-view />
    </div>
    <div class="additional-content">
      <foot-bar></foot-bar>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import FootBar from "./FootBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
    FootBar,
  },
};
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-container {
  flex: 1;
}

.additional-content {
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
