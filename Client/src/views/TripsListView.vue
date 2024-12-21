<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import {useLoginStore} from '@/stores/LoginStore'

const loginStore = useLoginStore();

// Search query for filtering trips
const searchQuery = ref<string>('');

// Carousel Images
const carouselImages = ref<string[]>([
  'https://via.placeholder.com/1600x300',
  'https://via.placeholder.com/1600x300/555',
  'https://via.placeholder.com/1600x300/777',
]);

// List of Trips
const trips = ref([
  {
    title: 'Mountain Adventure',
    description: 'Explore the beautiful mountains with our guided tours.',
    image: 'https://via.placeholder.com/400x200',
  },
  {
    title: 'Beach Getaway',
    description: 'Relax and enjoy the sun on pristine beaches.',
    image: 'https://via.placeholder.com/400x200/555',
  },
  {
    title: 'City Lights',
    description: 'Discover vibrant cities full of culture and life.',
    image: 'https://via.placeholder.com/400x200/777',
  },
]);

// Filter trips based on search query
const filteredTrips = computed(() =>
  trips.value.filter((trip) =>
    trip.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

onMounted(()=>{
  loginStore.setPreviousView('trips');
})
</script>

<template>
    <div>
    <!-- Carousel -->
    <div id="tripCarousel" class="carousel slide mt-3" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div
          v-for="(image, index) in carouselImages"
          :key="index"
          :class="['carousel-item', { active: index === 0 }]"
        >
          <img :src="image" class="d-block w-100" :alt="`Slide ${index + 1}`" />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#tripCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#tripCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>

    <!-- List of Trips -->
    <div class="container my-5">
      <h3 class="text-center mb-4 text-highlight">Explore Our Trips</h3>
      <div class="row">
        <div
          class="col-md-4 mb-4"
          v-for="(trip, index) in filteredTrips"
          :key="index"
        >
          <div class="card trip-card h-100">
            <img :src="trip.image" class="card-img-top" :alt="trip.title" />
            <div class="card-body">
              <h5 class="card-title text-primary">{{ trip.title }}</h5>
              <p class="card-text">{{ trip.description }}</p>
              <a href="#" class="btn btn-highlight">Book Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Carousel Styling */
.carousel-item img {
  object-fit: cover;
  height: 300px;
}

/* Trip Card */
.trip-card {
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.trip-card:hover {
  transform: translateY(-5px);
}
</style>