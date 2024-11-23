<template>
  <div class="post-container">
    <div class="post-header">
      <p class="author">{{ author }}</p>
      <p class="date">{{ new Date(timestamp).toLocaleDateString() }}</p>
    </div>
    <img :src="image" :alt="title"/>
    <div class="post-group">
      <h2>{{ title }}</h2>
      <p>{{ content }}</p>
    </div>
    <div class="like-button-container">
      <LikeButton :initialLikes="likes" @update-likes="updateLikes"/>
    </div>
  </div>
</template>

<script>
import LikeButton from "@/components/LikeButton.vue";

export default {
  components: {LikeButton},
  props: {
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
  },
  methods: {
    updateLikes(newLikes) {
      this.$emit("update-likes", newLikes);
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.like-button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.post-container {
  display: flex;
  border-radius: 10px;
  font-family: verdana, serif;
  flex-direction: column;
  background-color: #4E586E;
  color: white;
  padding: 2%;
  width: 60%;
  margin: 20px auto;
  position: relative;
  box-shadow: 0 0 30px rgba(68, 68, 68, 0.5);
}

.post-group {
  font-size: 20px;
  margin-bottom: 18px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

h2, .post-header {
  color: #F78361;
}
</style>