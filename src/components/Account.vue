<template>
    <div>
      <h2>Change Password</h2>
      <form @submit.prevent="changePassword">
        <input type="password" id="current-password" placeholder = "Current Password" v-model="currentPassword" required><br><br>
        <input type="password" id="new-password" placeholder="New Password" v-model="newPassword" required><br><br>
        <button type="submit">Change</button>
      </form>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script lang="ts">
import { auth } from "../main";

export default {
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      errorMessage: ''
    }
  },
  methods: {
    changePassword() {
      alert("Unfortunately not implemented yet")
    }
  }
}
</script>