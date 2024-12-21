<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/valid-template-root -->
<script setup lang="ts">
import apiServices from '@/services/apiServices';
import { useLoginStore } from '@/stores/LoginStore'
import { ref } from 'vue';
import { useRouter } from 'vue-router';


// Use Vue Router for navigation
const router = useRouter()

// LOGIN
const loginStore = useLoginStore();
const email = ref('');
const password = ref('');

const handleLogin = async () => {
//   console.log('Email:', email.value);
//   console.log('Password:', password.value);
  // Add your login logic here (e.g., Axios call to API)
  try {
    const response = await apiServices.post('/auth/login', {
      email: email.value,
      password: password.value
    })
    if (response.data.active) {
      const username = response.data.user.client

      // Save JWT token in local storage
      sessionStorage.setItem('token', response.data.token)
      loginStore.setUserName(username);
      console.log(loginStore.getUserName);
      router.push({path: loginStore.getPreviousView})
    } else {
    //   sessionStorage.setItem('confirmToken', response.data.confirmation)
    //   router.push({ path: '/confirmation' })
    }
    
  } catch (error) {
    console.error('Login failed:', error)
    alert('Invalid email or password')
  }
};

</script>

<template>
    <div class="login-container">
    <div class="card login-card shadow-lg">
      <div class="card-body">
        <h2 class="text-center text-highlight mb-4">Login</h2>
        <form @submit.prevent="handleLogin">
          <!-- Email Field -->
          <div class="mb-4">
            <label for="email" class="form-label">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="form-control rounded-pill"
              placeholder="Enter your email"
              required
            />
          </div>

          <!-- Password Field -->
          <div class="mb-4">
            <label for="password" class="form-label">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="form-control rounded-pill"
              placeholder="Enter your password"
              required
            />
          </div>

          <!-- Submit Button -->
          <div class="d-grid">
            <button type="submit" class="btn btn-highlight rounded-pill">Login</button>
          </div>
        </form>

        <!-- Additional Options -->
        <div class="text-center mt-4">
          <p>
            Don't have an account? 
            <a href="#" class="text-highlight">Register</a>
          </p>
          <!--<a href="#" class="text-muted">Forgot password?</a>-->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Login Page Container */
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  padding: 20px;
  margin: 0; /* Ensure no spacing outside the container */
}

/* Login Card */
.login-card {
  width: 100%;
  max-width: 400px;
  border: none;
  border-radius: 10px;
  background-color: white;
}

/* Highlighted Text */
.text-highlight {
  color: #ffcc00;
}

/* Submit Button */
.btn-highlight {
  background-color: #ffcc00;
  color: #333;
  border: none;
}

.btn-highlight:hover {
  background-color: #e6b800;
}
</style>