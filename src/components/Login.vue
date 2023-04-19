<template>
    <div class="center-menu">
        <div>
            <form @submit.prevent="loginUser" class="form">
                <br>
                <input type="email" id="email" v-model="email" required placeholder="Email">
                <br>
                <input type="password" id="password" v-model="password" required placeholder="Password">
                <br>
                <button type="submit">Login</button>
            </form>
            <!-- <p>{{ message }}</p> -->
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../main";

// export default {
//   setup() {
//     const email = ref("");
//     const password = ref("");
//     const message = ref("");

//     const loginUser = async () => {
//       try {
//         const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
//         message.value = `User logged in: ${userCredential.user.email}`;
//       } catch (error) {
//         message.value = `Error logging in user: ${error.message}`;
//       }
//     };

//     return { email, password, loginUser, message };
//   },
// };
</script>

<style scoped>
.center-menu {
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

.form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

input {
    width: 100px;
    height: 20px;
    margin: 20px auto;
    padding: 10px 45px;
    font-size: 16px;
    border: 1px solid #94BAB5;
    border-color: #8CB0AB;
    border-radius: 30px;
    caret-color: black;
    color: black;
}
</style>