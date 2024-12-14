
// siia lisada meetodid update ja delete jaoks, praegu see ka src/router/index.js all lingina, aga vist peab igal erineval postil oma URL olema

<template>
  <div class="container">
    <div class="signup-box">
      <h1>A post</h1>
      <div class="inputs">
        <label for="Post">Body:</label>
        <input placeholder="Enter your post message" required/>
      </div>
      <div class="button-container">
        <button @click="goToHome" type="submit">Update</button>
        <button @click="goToHome" type="submit">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
    goToHome() {
      this.$router.push("/");
    },
  },
}
</script>

<style scoped>
body {
  background-color: #1c1c1c;
  margin: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.signup-box {
  background-color: rgb(77, 87, 109);
  color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
}

.inputs {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.button-container {
  margin: -2rem 1 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  gap: 3rem;
}

label {
  font-weight: bold;
  margin-right: 1rem;
  width: 100px;
  text-align: right;
}

input {
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid #ccc;
}

button {
  padding: 0.8rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
}

.error-message {
  margin-top: 1rem;
  color: red;
  font-size: 0.9rem;
}
</style>
