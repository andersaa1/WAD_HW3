<template>
    <div class="container">
    <div class="box">
        <h1>Contact us</h1>
        <p>If you have any questions, feel free to reach out to us!</p>
        <ul>
        <li>Email: <a href="mailto:hw4support@contact.com">hw4support@contact.com</a></li>
        <li>Phone: <a href="tel:+37258182808">+372 5818 2808</a></li>
        <li>Address: Narva mnt 18, 51009 Tartu, Estonia</li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactsView",
};
</script>

<style scoped>
.box {
  background-color: rgb(77, 87, 109);
  color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  height: 80vh;
}


</style>
