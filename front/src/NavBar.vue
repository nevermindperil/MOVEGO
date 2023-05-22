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
            <router-link :to="{ name: 'Profile' }" class="nav-link"
              >{{ getUsername() }} 님</router-link
            >
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <button class="nav-link" @click="logout">LOGOUT</button>
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
      // 로그아웃 처리 로직
      this.$store.commit("LOGOUT");
      // 로그아웃 후 로그인 페이지로 이동
      this.$router.push({ name: "HomeView" });
    },
    getUsername() {
      const username = this.$store.state.username;
      if (username) {
        return `${username} 님`; // 유저 이름과 " 님"을 함께 반환합니다.
      } else {
        return "";
      }
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLogin;
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
