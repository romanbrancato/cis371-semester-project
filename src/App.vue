<script setup lang="ts">
</script>

<template>
  <div>
    <img class="logo" src="./assets/logo.png">
  </div>
  <div class="link-container2">
    <RouterLink to="/">
      <fa :icon="['fas', 'magnifying-glass']" /> Browse
    </RouterLink>
  </div>
  <div class="link-container">
    <RouterLink to="/login">
      <fa :icon="['fass', 'tags']" /> List Item
    </RouterLink>

    <RouterLink to="/login">
      <fa :icon="['fas', 'user']" /> Login
    </RouterLink>

    <RouterLink to="/help">
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
}

.logo {
  width: 110px;
  height: 120px;
  position: fixed;
  left: 13.6%;
  top: 6.5%;
  transform: translateY(-50%);
}

.link-container {
  position: fixed;
  top: 6%;
  right: 10%;
  width: 50vh;
  height: 10vh;
}

.link-container2 {
  position: fixed;
  top: 6%;
  right: 60%;
  width: 50vh;
  height: 10vh;
}
</style>