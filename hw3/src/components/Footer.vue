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
    background-color: white;
    border-top: 1.5px solid #ccc; /* Gray border at the top of the footer */
    display: flex;
}

.container {
  display: flex;
  flex-direction: column; /* Stack elements */
  width: 100%; /* Ensures full width of the footer */
}

.github-link {
  color: #0366d6;
  text-decoration: none;
  font-weight: bold;
  margin: -0.5rem 0 0; /* Brings Github link closer to trademark */
}
  </style>
  