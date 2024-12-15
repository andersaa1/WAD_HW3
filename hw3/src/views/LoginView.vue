<template>
  <div class="container">
    <div class="login-box">
        <h1>Log in</h1>
      <form @submit.prevent="LogIn">
        <div class="inputs">
          <label for="email">Email:</label>
          <input v-model="email" type="email" placeholder="Enter your email" required/>
        </div>
        <div class="inputs">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" required/>
        </div>
        <button type="submit">Log in</button>
        <p class="signup-text">
            Don't have an account? 
            <router-link to="/signup" class="signup-link">Sign up</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
name: "LogIn", 

data: function() {
    return {
   email: '',
   password: '',
  }
  },
  methods: {


LogIn() {
      var data = {
        email: this.email,
        password: this.password
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include', //  Don't forget to specify this if you need cookies
          body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      //this.$router.push("/");
      location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
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

.login-box {
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

.signup-text {
  margin-top: 12px;
  font-size: 14px;
  color: #6c757d;
  line-height: 0;
}

.signup-link {
  color: #007bff;
  text-decoration: none;
}

.signup-link:hover {
  text-decoration: underline;
}
</style>
