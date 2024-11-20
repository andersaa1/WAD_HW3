<template>
  <div class="container">
    <div class="signup-box">
      <!-- @submit activates submitForm method when the button is clicked -->
      <form @submit.prevent="submitForm">
        <div class="inputs">
          <label for="email">Email:</label>
          <input placeholder="Enter your email" required/>
        </div>
        <div class="inputs">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" required/>
        </div>
        <div v-if="passwordError" class="error-message">
          <p>{{ passwordError }}</p>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      passwordError: '',
    };
  },

  computed: {
    passwordCheck() {
      return !this.passwordError;
    }
  },

  methods: {
    validatePassword(password) {
      // Is password 8 - 15 characters long
      if (password.length < 8 || password.length > 15) {
        return "Password should be between 8 and 15 characters long.";
      }
      // Includes at least one uppercase alphabet character.
      // .test() returns true if it's argument contains a [A-Z] character
      // .test() returns false if it's argument doesn't contain a [A-Z] character
      if (!/[A-Z]/.test(password)) {
        return "Password has to include at least one uppercase alphabet character.";
      }
      // Includes at least two lowercase alphabet characters.
      // match() - looks for all occurrences and returns them as an array
      // g - look for all the matches, not only the first one
      // or check with empty brackets is needed because it match() can't find any occurrences it will return 'null' and then it's mähis
      if ((password.match(/[a-z]/g) || []).length < 2) {
        return "Password has to includes at least two lowercase alphabet characters.";
      }
      // Includes at least one numeric value.
      // /\d/ - digits 0-9
      if (!/\d/.test(password)) {
        return "Password has to include at least one numeric value.";
      }
      // It should start with an uppercase alphabet.
      if (!/[A-Z]/.test(password.charAt(0))) {
        return "Password has to start with an uppercase alphabet character.";
      }
      // It should include the character “_”
      if (!password.includes('_')) {
        return "Password has to include the character '_'.";
      }

      return '';  // Returns empty string if everything correct
    },

    // Display an alert if the submit button was correct
    submitForm() {
      this.passwordError = this.validatePassword(this.password);
      if (!this.passwordError) {
        alert('Password accepted');
        window.location.reload(); // refreshes the page
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
}

.signup-box {
  background-color: #333;
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
