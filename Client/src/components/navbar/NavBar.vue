<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useLoginStore } from '@/stores/LoginStore';

// LOGIN
const loginStore = useLoginStore();
const username = computed(() => loginStore.username);

// Search query for filtering trips
const searchQuery = ref<string>('');
</script>

<template>
    <!-- Top Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div class="container">
        <!-- Logo -->
        <!--<a class="navbar-brand" href="#">Go<span class="text-highlight">Ride</span></a>-->
        <RouterLink :to="{ name: 'trips' }" class="navbar-brand" >Go<span class="text-highlight">Ride</span></RouterLink>

        <!-- Search Bar -->
        <form class="d-flex mx-auto" role="search">
          <input
            v-model="searchQuery"
            class="form-control me-2 rounded-pill"
            type="search"
            placeholder="Search trips..."
            aria-label="Search"
          />
          <button class="btn btn-highlight rounded-pill" type="submit">Search</button>
        </form>

        <!-- Login/User -->
        <div>
          <!--<a href="#" class="btn btn-outline-light rounded-pill">Login</a>-->
          <RouterLink v-if="!username" :to="{ name: 'login' }" class="btn btn-outline-light rounded-pill">Login</RouterLink>
          <RouterLink v-else :to="{name: 'profile'}" class="btn btn-outline-light rounded-pill">{{ username }}</RouterLink>
        </div>
      </div>
    </nav>
</template>

<style scoped>
/* Custom Navbar */
.custom-navbar {
  background: linear-gradient(90deg, #1e3c72, #2a5298);
}

.navbar-brand {
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
}

.text-highlight {
  color: #ffcc00;
}

.btn-highlight {
  background-color: #ffcc00;
  color: #333;
  border: none;
}

.btn-highlight:hover {
  background-color: #e6b800;
  color: #222;
}
</style>