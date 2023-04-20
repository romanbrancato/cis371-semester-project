<template>
    <button v-if="currentUser" @click="logout">Logout</button>
</template>

<script setup lang="ts">
import { auth,} from "../main";
import { ref } from "vue";
import { useRouter } from "vue-router";

const currentUser = ref(auth.currentUser);
const router = useRouter();


const logout = async () => {
  try {
    await auth.signOut();
    router.push("/login"); 
  } catch (error) {
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
</style>