<template>
  <div>
    <div v-for="(post, index) in posts" :key="index">
      <Post
          :author="post.author"
          :title="post.title"
          :content="post.content"
          :timestamp="post.timestamp"
          :image="post.image"
          :likes="post.likes"
          @update-likes="updateLikes(index, $event)"
      />
    </div>
    <LikeReset @reset-all-likes="resetAllLikes" />
  </div>
</template>

<script>
import Post from "@/components/Post.vue";
import LikeReset from "@/components/LikeReset.vue";

export default {
  name: "HomeView",
  components: {Post, LikeReset},
  data() {
    return {
      posts: [],
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