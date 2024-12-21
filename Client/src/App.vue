<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import NavBar from './components/navbar/NavBar.vue';
import FooterComponent from './components/FooterComponent.vue';

const router = useRouter()
</script>

<template>
  <NavBar/>
  <RouterView />
  <FooterComponent />
</template>

<style scoped>

</style>
