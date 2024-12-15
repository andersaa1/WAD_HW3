// TODO: Implement the delete all button component

<template>
  <div class="container">
    <button @click="logout" class="logout-button">Logout</button>
    <PostButton @newPost="newPost"/>
    <DeleteAllButton/>
  </div>
  <div v-for="(post, index) in posts" :key="index">
    <Post
        :author="post.author"
        :title="post.title"
        :content="post.content"
        :timestamp="post.timestamp"
        :image="post.image"
        :likes="post.likes"
    />
  </div>
</template>

<script>
import PostButton from "@/components/PostButton.vue";
import Post from "@/components/Post.vue";
import DeleteAllButton from "@/components/DeleteAllButton.vue";

export default {
  name: "HomeView",
  components: {DeleteAllButton, Post, PostButton},
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
      fetch("http://localhost:3000/posts", {
        method: "GET",
        credentials: "include", // Required for handling cookies
      })
          .then(response => response.json())
          .then(data => {
            this.posts = data;
            console.log(this.posts)
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
.container{
  justify-content: center;
  display: flex;
  align-items: center;
  gap: 1rem;
}
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
}
</style>