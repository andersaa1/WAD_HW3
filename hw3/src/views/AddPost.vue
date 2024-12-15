<template>
  <div class="container">
    <div class="signup-box">
      <h1>Add post</h1>
      <div>
        <div class="inputs">
          <label for="Post">Title:</label>
          <input placeholder="Title" required/>
          <div/>
        </div>
        <div class="inputs">
          <label for="Post">Content:</label>
          <input placeholder="Content" required/>
          <div/>
        </div>
        <div class="inputs">
          <label for="Post">Image url:</label>
          <input  placeholder="Image url"/>
          <div/>
        </div>
        <button @click="goToHome" type="submit">Post</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToHome() {
      const title = this.$el.querySelector('input[placeholder="Title"]').value;
      const content = this.$el.querySelector('input[placeholder="Content"]').value;
      const imageUrl = this.$el.querySelector('input[placeholder="Image url"]').value;

      const postBody = {
        title: title,
        content: content,
        image: imageUrl
      };

      fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
        credentials: "include", // Required for handling cookies
      })
          .then((response) => {
            if (response.ok) {
              console.log("Post added successfully");
              this.$router.push("/");
            } else {
              console.error("Failed to add post");
            }
          })
          .catch((error) => console.error("Error during post:", error));
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
