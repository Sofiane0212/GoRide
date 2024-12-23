<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { useTripStore } from './stores/TripStore';
import { RouterLink, RouterView, useRouter } from 'vue-router'
import NavBar from './components/navbar/NavBar.vue';
import FooterComponent from './components/FooterComponent.vue';
import { onMounted } from 'vue';

const router = useRouter()
const tripStore = useTripStore()

onMounted(async () => {
  tripStore.fetchTrips();
})
</script>

<template>
  <NavBar/>
  <RouterView />
  <FooterComponent />
</template>

<style scoped>

</style>
