<template>
  <div class="container">
    <div class="signup-box">
      <h1>Create a new account</h1>
      <form @submit.prevent="SignUp">
        <div class="inputs">
          <label for="email">Email:</label>
          <input v-model="email" type="email" placeholder="Enter your email" required/>
        </div>
        <div class="inputs">
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" placeholder="Enter your password" required/>
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
name: "SignUp", 

data: function() {
    return {
   email: '',
   password: '',
  }
  },
  methods: {


SignUp() {
      var data = {
        email: this.email,
        password: this.password
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/auth/signup", {
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
      this.$router.push("/");
      //location.assign("/");
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
