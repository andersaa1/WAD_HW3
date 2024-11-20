<template>
  <HeaderComponent />
  <div class= "main-content">
    <router-view/>
  </div>
  <FooterComponent />
</template>

<script>
  import HeaderComponent from './components/Header.vue';
  import FooterComponent from './components/Footer.vue';
  export default {
    components: {
      HeaderComponent,
      FooterComponent,
    },
  };
</script>

<style>
#app {
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  flex-direction: column;
  height: 100vh; /* CHANGE THIS IF MÄHIS */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main-content {
  flex: 1;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
