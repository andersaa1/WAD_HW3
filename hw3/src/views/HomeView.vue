<template>
  <div>
    <div v-for="(post, index) in posts" :key="index">
      <p>{{ post.title }}</p>
      <LikeButton
        :initialLikes="post.likes"
        @update-likes="updateLikes(index, $event)"
      />
    </div>
    <LikeReset @reset-all-likes="resetAllLikes" />
  </div>
</template>

<script>
import LikeButton from "@/components/LikeButton.vue";
import LikeReset from "@/components/LikeReset.vue";

export default {
  name: "ParentComponent",
  components: { LikeButton, LikeReset },
  data() {
    return {
      posts: [
        { title: "Post 1", likes: 0 },
        { title: "Post 2", likes: 0 },
        { title: "Post 3", likes: 0 },
      ],
    };
  },
  methods: {
    updateLikes(index, newLikes) {
      this.posts[index].likes = newLikes;
    },
    resetAllLikes() {
      this.posts.forEach((post) => {
        post.likes = 0;
      });
    },
  },
};
</script>
