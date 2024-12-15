<template>
  <div class="post-button-container">
    <button class="post-button" @click="deleteAllPosts">
      Delete all posts
    </button>
  </div>
</template>

<script>
export default {
  name: "DeleteAllButton",
  methods: {
    deleteAllPosts() {
      fetch("http://localhost:3000/posts", {
        method: "DELETE",
        credentials: "include",
      })
          .then((response) => {
            if (response.ok) {
              console.log("All posts deleted");
              this.$emit("postsDeleted");
              location.reload();
            } else {
              console.error("Failed to delete posts");
            }
          })
          .catch((error) => console.error("Error deleting posts:", error));
    },
  },
};
</script>

<style scoped>
.post-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.post-button {
  display: flex;
  align-items: center;
  gap: 8px; /* Spacing between image and text */
  padding: 8px 16px;
  font-size: 16px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.post-button:hover {
  background-color: #e0e0e0;
}
</style>