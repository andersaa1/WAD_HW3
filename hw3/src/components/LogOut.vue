
// kui välja logitud, siis asendada "Log in" selle nupuga

<template>
  <div class="logout-container">
    <button @click="logOut" class="logout-button">Log Out</button>
  </div>
</template>

<script>
export default {
  name: 'LogOut',
  methods: {
    logOut() {
        // method to do for backend
      // localStorage.removeItem('user-token');  // Example for removing a stored token
      // sessionStorage.removeItem('user-token'); // Example for removing a session token
      // Optionally, if using a cookie:
      // document.cookie = "user-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.logout-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.logout-button {
  background-color: #f54b64;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #e04253;
}
</style>
