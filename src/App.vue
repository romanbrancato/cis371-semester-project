<script setup lang="ts">
</script>

<template>
  <div>
    <img class="logo" src="./assets/logo.png">
  </div>
  <div class="link-container">
    <RouterLink to="/login">
      <fa :icon="['fass', 'tags']" /> List Item
    </RouterLink>

    <RouterLink to="/login">
      <fa :icon="['fas', 'user']" /> Login
    </RouterLink>

    <RouterLink to="/">
      <fa :icon="['fas', 'handshake-angle']" /> Help
    </RouterLink>

  </div>
  <div class="center-menu">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.center-menu {
  position: fixed;
  top: 13%;
  left: 50%;
  transform: translateX(-50%);
  width: 150vh;
  height: 85vh;
  background-color: white;
  border-radius: 40px;
  overflow: auto;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom right, #97BEB9, White);
}

.logo {
  width: 110px;
  height: 120px;
  position: fixed;
  left: 13.6%;
  top: 6.5%;
  transform: translateY(-50%);
}

.link-container{
  position: fixed;
  top: 6%;
  right: 10%;
  width: 50vh;
  height: 10vh;
}
</style>