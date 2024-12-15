
// muuta siin postitused nagu on figure 2-s
// delete all button ka teha

<template>
  <button @click="logout" class="logout-button">Logout</button>
  <PostButton @newPost="newPost"/>
</template>

<script>
import PostButton from "@/components/PostButton.vue";
import Post from "@/components/Post.vue";

export default {
  name: "HomeView",
  components: {Post, PostButton},
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    logout() {
      fetch("http://localhost:3000/auth/logout", {
        method: "GET",
        credentials: "include", // Required for handling cookies
      })
        .then((response) => {
          if (response.ok) {
            console.log("User logged out");
            this.$router.push("/login"); // Redirect to login page
          } else {
            console.error("Logout failed");
          }
        })
        .catch((error) => console.error("Error during logout:", error));
    },

    newPost() {
      this.$router.push("/addpost");
    },

    fetchPosts() {
      fetch('data.json')
          .then(response => response.json())
          .then(data => {
            this.posts = data;
          })
          .catch(error => console.error('Error fetching posts:', error));
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>

<style>
body {
  background-color: #1c1c1c;
  margin: 0;
}

.logout-button {
  background-color: #3f12d4a6;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.8rem;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
}
</style>