<template>
  <header class="appHeader">
    <div class="container">
      <h1>PostIt</h1>
      <nav>
        <ul class="links">
          <li><router-link to="/">Home</router-link></li> |
          <li><router-link to="/signup">Signup</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
};
</script>

<style scoped>
.appHeader {
  background-color: white;
  color: #333;
  border-bottom: 1.5px solid #ccc;
}

.container {
  display: flex;
  flex-direction: column; /* Adjusted to stack title and nav */
  align-items: center;
}

.appHeader nav ul {
  list-style-type: none;
  padding: 0;
}

.links {
  list-style: none;
  margin: -1.5rem 0 0; /* Bring the nav closer to the title */
  padding: 0;
  display: flex;
  gap: 0.5rem; /* Space between links */
}


.inks li {
  display: inline;
}

.links a {
  color: #333;
  text-decoration: none;
}

.links a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}

</style>

