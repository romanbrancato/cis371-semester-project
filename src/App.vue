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
    <RouterLink :to="currentUser ? '/listitem' : '/login'">
      <fa :icon="['fass', 'tags']" /> List Item
    </RouterLink>

    <RouterLink :to="currentUser ? '/profile' : '/login'">
      <fa :icon="['fas', 'user']" /> {{ loggedInUser }}
    </RouterLink>

    <RouterLink to="/help">
      <fa :icon="['fas', 'handshake-angle']" /> Help
    </RouterLink>

  </div>
  <div class="center-menu">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { auth } from "./main";

const currentUser = ref(auth.currentUser);
const loggedInUser = ref("Login");

watch(currentUser, (user) => {
  loggedInUser.value = user ? user.email.substring(0, user.email.indexOf('@')) : "Login";
});

auth.onAuthStateChanged((user) => {
  currentUser.value = user;
}); 

</script>

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

a{
  margin-right: 30px;
}

</style>