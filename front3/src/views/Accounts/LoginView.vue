<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form
          @submit.prevent="login"
          class="p-4 bg-light shadow"
          style="
            width: 500px;
            height: 600px;
            margin-top: 100px;
            margin-bottom: 100px;
          "
        >
          <h1 class="text-center">LogIn Page</h1>
          <div class="form-group">
            <label for="username">Username:</label>
            <input
              type="text"
              id="username"
              v-model="username"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="form-control"
            />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Log In</button>
            <router-link :to="{ name: 'SignUpView' }" class="ml-2"
              >Sign Up</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogInView",
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    login() {
      const username = this.username;
      const password = this.password;

      const payload = {
        username,
        password,
      };

      this.$store.dispatch("login", payload);
      this.$router.push({ name: "HomeView" });
    },
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  align-items: center;
}

.form-control {
  border-radius: 0;
}

.btn-primary {
  border-radius: 0;
}
</style>
