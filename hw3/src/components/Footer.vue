<template>
  <footer class="appFooter">
    <div class="container">
      <p>&copy; 2024 PostIt. All rights reserved.</p>
      <a class="github-link" href="https://github.com/andersaa1/WAD_HW3">Github</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
};
</script>

<style scoped>
.appFooter {
  color: #F78361;
  background-color: #4E586E; /* Light gray background */
  display: flex;
  padding-bottom: 1rem;
}

.container {
  display: flex;
  flex-direction: column; /* Stack elements */
  width: 100%; /* Ensures full width of the footer */
}

.github-link {
  color: #F54B64;
  text-decoration: none;
  font-weight: bold;
  margin: -0.5rem 0 0; /* Brings Github link closer to trademark */
}
</style>
  