<template>
    <div class="post-button-container">
        <button class="post-button" @click="newPost">
        Add post
        </button>
    </div>
</template>

<script>
export default {
  name: "PostButton",
  methods: {
    newPost() {
      this.$router.push("/addpost");
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