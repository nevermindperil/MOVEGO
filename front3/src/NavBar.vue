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
            <router-link
              :to="'/profile/' + $store.state.username"
              class="nav-link"
              >Profile</router-link
            >
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <button class="nav-link logoutBtn" @click="logout">Logout</button>
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
  /* background-color: rgba(93, 92, 92, 0.469); */
  /* background-color: inherit; */
  background-color: rgba(0, 0, 0, 0.071);
}
.nav-link,
.navbar-brand {
  color: white;
  font-size: 43px;
}

.nav-link {
  margin-left: 20px;
}

.logoutBtn {
  background-color: inherit;
  border: 0px;
}
.nav-item:hover .nav-link {
  color: #b00710;
  font-weight: bold;
}
.navbar-brand:hover {
  color: #b00710;
}
</style>
