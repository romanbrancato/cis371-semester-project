<template>
    <div class="center-menu">
        <div id="nav">
            <router-link to="/login" active-class="active-tab">Login</router-link>
            <router-link to="/signup" active-class="active-tab">Sign Up</router-link>
        </div>
        <div>
            <form @submit.prevent="signup">
                <br>
                <input type="email" id="email" v-model="email" required placeholder="Email">
                <br>
                <input type="password" id="password" v-model="password" required placeholder="Password">
                <br>
                <button class="signup-button" type="submit"><fa :icon="['fas', 'user-plus']" /> Sign Up</button>
            </form>
        </div>
        <p>{{ message }}</p>
    </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../main";

export default {
    setup() {
        const email = ref("");
        const password = ref("");
        const message = ref("");

        const signup = async () => {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
                message.value = "Successfully signed up";
            } catch (error: any) {
                message.value = "Error creating user: " + error.message;
            }
        };
        return { email, password, signup, message };
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


.signup-button {
    margin: 20px auto;
    padding: 10px 45px;
    border: 3px solid black;
    background-color: #F4E5D3;
    border-radius: 30px;
}

.signup-button:hover {
    background-color: #E3D5C4;
}

#nav {
  display: flex;
  justify-content: center;
  width: 100%;
}

#nav a {
  color: black;
  padding: 10px;
  margin-right: 40px;
}

#nav a:last-child {
  margin-right: 0;
}

#nav a.active-tab {
  position: relative;
}

#nav a:hover {
  color: white;
}

#nav a.active-tab::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 2px;
  height: 50%;
  background-color: black;
}
</style>