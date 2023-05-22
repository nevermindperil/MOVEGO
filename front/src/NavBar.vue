<template>
  <header>
    <nav class="navbar navbar-expand-sm navbar-light">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand"> <b>MOV;GO</b> </router-link>

        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">HOME</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'movies' }" class="nav-link"
              >MOVIES</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'EgoView' }" class="nav-link"
              >EGO</router-link
            >
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link :to="{ name: 'LogInView' }" class="nav-link"
              >LOGIN</router-link
            >
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link :to="'/profile/' + $store.state.username"
              >Profile</router-link
            >
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <span class="nav-link" @click="logout">LOGOUT</span>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    logout() {
      this.$store.commit("LOGOUT");
      this.$router.push({ name: "LogInView" });
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLogin;
    },
    username() {
      return this.$store.state.username;
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: rgba(93, 92, 92, 0.469);
}
.nav-link,
.navbar-brand {
  color: white;
}
</style>
