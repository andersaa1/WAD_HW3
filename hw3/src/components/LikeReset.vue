<template>
  <div class="reset-button-container">
    <button class="reset-button" @click="resetLikes">
      Reset likes
    </button>
  </div>
</template>

<script>
export default {
  name: "LikeReset",
  methods: {
    resetLikes() {
      this.$emit("reset-all-likes");
    },
  },
};
</script>

<style scoped>
.reset-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.reset-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #8DB8F0;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.reset-button:hover {
  background-color: #A1C2EC;
}
</style>
