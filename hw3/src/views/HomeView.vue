
// muuta siin postitused nagu on figure 2-s
// delete all button ka teha

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
    <PostButton @newPost="newPost"/>
  </div>
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
</style>