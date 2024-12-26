<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import {useLoginStore} from '@/stores/LoginStore'
import { useTripStore } from '@/stores/TripStore';
import type { ITrip } from '@/shared/interfaces/Trip.interface';

const loginStore = useLoginStore();
const tripStore = useTripStore();
const router = useRouter();

// Search query for filtering trips
const searchQuery = ref<string>('');

// Carousel Images
const carouselImages = ref<string[]>([
  'https://via.placeholder.com/1600x300',
  'https://via.placeholder.com/1600x300/555',
  'https://via.placeholder.com/1600x300/777',
]);

// List of Trips
// const trips = ref([
//   {
//     title: 'Mountain Adventure',
//     description: 'Explore the beautiful mountains with our guided tours.',
//     image: 'https://via.placeholder.com/400x200',
//   },
//   {
//     title: 'Beach Getaway',
//     description: 'Relax and enjoy the sun on pristine beaches.',
//     image: 'https://via.placeholder.com/400x200/555',
//   },
//   {
//     title: 'City Lights',
//     description: 'Discover vibrant cities full of culture and life.',
//     image: 'https://via.placeholder.com/400x200/777',
//   },
// ]);

const trips = ref<ITrip[]>([])
// Format times
const formatTime = (time: string | Date) => {
  const date = new Date(time);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
function statusClass(status: string) {
  if (status === 'completed') return 'status-completed';
  if (status === 'scheduled') return 'status-scheduled';
  return '';
}

// Filter trips based on search query
// const filteredTrips = computed(() =>
//   trips.value.filter((trip) =>
//     trip.title.toLowerCase().includes(searchQuery.value.toLowerCase())
//   )
// );

// go to profile
function goToProfile(id: string) {
  loginStore.setUserId(id);
  if (loginStore.getUserId !== '') router.push({name: 'profile'});
}

onMounted(()=>{
  trips.value = tripStore.getTrips;
  loginStore.setPreviousView('trips');
  loginStore.userId = '';
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

      <div class="list-group">
        <!-- Loop through trips -->
        <div
          v-for="(trip, index) in tripStore.getTrips"
          :key="index"
          class="list-group-item shadow-sm mb-3 rounded trip-item"
        >
          <div class="row align-items-center">
            <!-- Left Section -->
            <div class="col-md-6">
              <h5 class="trip-title">
              {{ trip.origin }} → {{ trip.destination }} - 
              <span :class="statusClass(trip.status)" class="trip-status">
                {{ trip.status }}
              </span>
            </h5>
              <p class="trip-details">
                <strong>Departure:</strong> {{ formatTime(trip.departureTime) }} <br />
                <strong>Arrival:</strong> {{ formatTime(trip.arrivalTime) }}
              </p>
            </div>

            <!-- Right Section -->
            <div class="col-md-6 text-md-end">
              <p class="trip-details">
                <strong>Price:</strong> ${{ trip.price }}
              </p>
              <p class="trip-details">
                <strong>Vehicle:</strong> {{ trip.vehicleId.make }} {{ trip.vehicleId.model }}
              </p>
              <p class="trip-details">
                <strong>Seats:</strong> {{ trip.vehicleId.seats }}
              </p>
            </div>
          </div>

          <!-- Driver Button -->
          <div class="text-center mt-3">
            <button class="btn btn-highlight" @click.prevent="goToProfile(trip.vehicleId.userId._id)">
              Driver: {{ trip.vehicleId.userId.name }}
            </button>
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

/* List Group Item Styling */
.trip-item {
  background: linear-gradient(90deg, #e3f2fd, #bbdefb); /* Light blue gradient */
  border: none;
  color: #0d47a1; /* Dark blue text */
  padding: 20px;
  transition: transform 0.2s ease, background 0.2s ease;
}

.trip-item:hover {
  transform: scale(1.02); /* Slight zoom on hover */
  background: linear-gradient(90deg, #bbdefb, #90caf9); /* Darker gradient on hover */
}

/* Trip Title Styling */
.trip-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #0d47a1;
}

/* Trip Details Styling */
.trip-details {
  font-size: 1rem;
  color: #0d47a1;
}

/* Highlighted Button Styling */
.btn-highlight {
  background-color: #ffcc00; /* Yellow highlight */
  color: #0d47a1;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
}

.btn-highlight:hover {
  background-color: #e6b800; /* Darker yellow on hover */
  color: #0c356e; /* Darker blue */
}

/* Section Title Styling */
.text-highlight {
  color: #ffcc00; /* Yellow highlight for title */
}

/* Base styling for the status */
.trip-status {
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  font-weight: bold;
  color: white;
}

/* Completed trips: Green background */
.status-completed {
  background-color: #28a745; /* Bootstrap green */
}

/* Scheduled trips: Blinking red background */
@keyframes blink-red {
  0%, 100% {
    background-color: #dc3545; /* Bootstrap red */
  }
  50% {
    background-color: #ff6b6b; /* Lighter red */
  }
}

.status-scheduled {
  animation: blink-red 1s infinite;
}
</style>
