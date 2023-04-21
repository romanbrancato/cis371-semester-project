<template>
  <div>
    <div class="side-bar">
      <ul>
        <li :class="{ active: currentTab === 'account' }"><a @click="currentTab = 'account'"><fa :icon="['fas', 'user']" /> Account</a></li>
        <li :class="{ active: currentTab === 'listings' }"><a @click="currentTab = 'listings'"><fa :icon="['fass', 'tags']" /> Listings</a></li>
      </ul>
      <button class="logout-button" @click="logout"><fa :icon="['fas', 'right-from-bracket']" /> Logout</button>
    </div>
    <div class="tab-content">
      <account v-if="currentTab === 'account'" />
      <listings v-if="currentTab === 'listings'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { auth, } from "../main";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Account from "./Account.vue";
import Listings from "./Listings.vue";

const router = useRouter();

const currentTab = ref("account");

const logout = async () => {
  try {
    await auth.signOut();
    router.push("/login");
  } catch (error: any) {
    console.error("Error logging out user:", error.message);
  }
}
</script>

<style>
button {
  margin: 20px auto;
  padding: 10px 45px;
  border: 3px solid black;
  background-color: #F4E5D3;
  border-radius: 30px;
}

.logout-button {
  position: fixed;
  bottom: 5%;
  margin: 20px auto;
  padding: 10px 45px;
  border: 3px solid black;
  background-color: #F4E5D3;
  border-radius: 30px;
}

.side-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 15%;
  transform: translateX(-50%);
  width: 25vh;
  height: 85vh;
  border-radius: 40px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to bottom right, #90B5B0, White);
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

li a {
  display: block;
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
}

li a:hover {
  color: white;
}
.active {
  position: relative;
  color: white;
}

.active::before {
  content: "";
  position: absolute;
  top: 2px;
  left: -5px;
  height: 75%;
  width: 6px;
  border: 3px solid black;
  background-color: #F4E5D3;
}

.tab-content{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 25%;
    width: 100vh;
    height: 85vh;
    border-radius: 40px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
</style>