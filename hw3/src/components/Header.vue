<template>
  <header class="appHeader">
    <div class="container">
      <div class="header-row">
        <h1>PostIt</h1>
        <div class="auth">
          <button @click="goToLogin" class="login-button">
            <img src="@/assets/login.png" alt="Log in Icon" class="icon" />
            Log in
          </button>
        </div>
      </div>
      <nav>
        <ul class="links">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          |
          <li>
            <router-link to="/contact">Contact</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  //components: {
  //  LogOut,
  //},
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.appHeader {
  background-color: #4E586E;
  color: #fff;
  box-shadow: 0 0 50px rgba(68, 68, 68, 1);
  padding: 10px 20px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

h1 {
  color: #F78361;
  margin: 0;
}

.links {
  list-style: none;
  margin: -2rem 0 0; /* to bring the nav closer to the title */
  padding: 0;
  display: flex;
  font-size: 22px;
  gap: 0.5rem; /* to add space between links */
}

.links a {
  color: #F54B64;
  text-decoration: none;
}

.links a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}

.auth {
  display: flex;
  flex-direction: column;
  align-items: flex-end; 
}

.login-button {
  display: flex;
  align-items: center;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 10px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0056b3;
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
</style>
