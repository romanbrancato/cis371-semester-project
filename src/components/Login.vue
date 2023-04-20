<template>
    <div class="center-menu">
        <div id="nav">
            <router-link to="/login" active-class="active-tab">Login</router-link>
            <router-link to="/signup" active-class="active-tab">Sign Up</router-link>
        </div>
        <div>
            <form @submit.prevent="loginUser">
                <br>
                <input type="email" id="email" v-model="email" required placeholder="Email">
                <br>
                <input type="password" id="password" v-model="password" required placeholder="Password">
                <br>
                <button class="login-button" type="submit">Login</button>
            </form>
        </div>
        <p>{{ message }}</p>
    </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../main";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const message = ref("");

    const loginUser = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        message.value = `Successfully logged in`;
      } catch (error) {
        message.value = `Error logging in: ${error.message}`;
      }
    };
    return { email, password, loginUser, message };
  },
};
</script>

<style scoped>
.center-menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0%;
    left: 50%;
    transform: translateX(-50%);
    width: 65vh;
    height: 85vh;
    border-radius: 40px;
    overflow: auto;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    background: linear-gradient(to bottom right, #97BEB9, White);
}

input {
    width: 190px;
    height: 35px;
    padding: 5px 20px;
    margin: 20px auto;
    text-align: center;
    font-size: 16px;
    border: 1px solid #94BAB5;
    border-color: #8CB0AB;
    border-radius: 30px;
    caret-color: black;
    color: black;
}

input:focus {
    outline: none;
}

.login-button {
    margin: 20px auto;
    padding: 10px 45px;
    border: 3px solid black;
    background-color: #F4E5D3;
    border-radius: 30px;
}

.login-button:hover {
    background-color: #E3D5C4;
}

</style>