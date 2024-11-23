<template>
  <button class="like-button" @click="incrementLikes">
  <img class="like-icon" src="@/assets/like.png" alt="Like" />
    Like {{ likes }}
  </button>
</template>

<script>
export default {
  name: "LikeButton",
  props: {
    initialLikes: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      likes: this.initialLikes,
    };
  },
  watch: {
    initialLikes(newLikes) {
      this.likes = newLikes;
    },
  },
  methods: {
    incrementLikes() {
      this.likes++;
      this.$emit("update-likes", this.likes);
    },
  },
};
</script>

<style scoped>
.like-button {
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

.like-button:hover {
  background-color: #e0e0e0;
}

.like-icon {
  width: 20px;
  height: 20px;
}
</style>