<template>
  <div class="container-xxl d-flex flex-column align-items-center justify-content-center min-vh-100">
    <div class="col-md-2">
      <img src="../assets/marmara-logo.png" class="img-fluid" alt="marmara university logo">
    </div>
    <div class="col-md-2 mt-4 ">
      <form class="row g-3" @submit.prevent="handleSubmit">
        <input v-model="username" type="text" placeholder="Username" class="form-control mt-2" required>
        <input v-model="password" type="password" placeholder="Password" class="form-control mt-2" required>
        <button type="submit" class="btn btn-primary mt-2">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import {useAuthStore} from "../stores/authStore";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await fetch('http://localhost:3001/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        if (response.ok) {
          const authStore = useAuthStore();
          authStore.login();
          this.$router.push({ name: 'control-panel' });
        } else if (response.status === 401) {
          window.alert('Unauthorized - Login failed');
        } else {
          window.alert('Error occurred during login');
        }
      } catch (error) {
        window.alert('Error occurred during login');
      }
    },

  },
};


</script>
