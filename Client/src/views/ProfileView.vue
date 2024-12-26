<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import {useLoginStore} from '@/stores/LoginStore'
import apiServices from '@/services/apiServices';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import type { IUser } from '@/shared/interfaces/User.interface';
import type { IVehicle } from '@/shared/interfaces/Vehicle.interface';
import type { ITrip } from '@/shared/interfaces/Trip.interface';

const loginStore = useLoginStore();
const router = useRouter();

// Example user data (replace with actual API data)
const emptyUser = ref({
  user: {
    name: '',
    email: '',
    phonenumber: '',
  },
  vehicle: {
    make: '',
    model: '',
    licensePlate: '',
    seats: 0,
  },
  trips: [
    {
      origin: '',
      destination: '',
      departureTime: '',
      arrivalTime: '',
      status: '',
      price: 0,
      reservationIds: [
        { comment: '', rating: 0 },
      ],
    },
  ],
});

const profile = ref(emptyUser);

// Format time
const formatTime = (time: string | Date) => {
  const date = new Date(time);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

function statusClass(status: string) {
  if (status === 'completed') return 'status-completed';
  if (status === 'scheduled') return 'status-scheduled';
  return '';
}

onMounted(async ()=>{
  try {
    const response = await loginStore.fetchProfile();
    console.log(response);
    
    if(response.found) {
      profile.value = {user: response.user, vehicle: response.vehicle, trips: response.trips};
    }
    else {
      loginStore.setUserId('');
      router.push({path: '/'});
    }
  } catch (error) {
    console.error('no profile:', error)
  }
})
</script>

<template>
    <div class="container my-5">
    <!-- User Profile and Vehicle Info -->
    <div class="row mb-5">
      <!-- User Profile -->
      <div class="col-md-6">
        <div class="card shadow-sm profile-card">
          <div class="card-body" v-if="profile.user">
            <h3 class="profile-title">User Profile</h3>
            <p><strong>Name:</strong> {{ profile.user.name }}</p>
            <p><strong>Email:</strong> {{ profile.user.email }}</p>
            <p><strong>Phone:</strong> {{ profile.user.phonenumber }}</p>
          </div>
        </div>
      </div>

      <!-- Vehicle Info (if available) -->
      <div class="col-md-6" v-if="profile.vehicle">
        <div class="card shadow-sm vehicle-card">
          <div class="card-body">
            <h3 class="profile-title">Vehicle Info</h3>
            <p><strong>Make:</strong> {{ profile.vehicle.make }}</p>
            <p><strong>Model:</strong> {{ profile.vehicle.model }}</p>
            <p><strong>License Plate:</strong> {{ profile.vehicle.licensePlate }}</p>
            <p><strong>Seats:</strong> {{ profile.vehicle.seats }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- User's Trips -->
    <h3 class="text-highlight mb-4">Trips</h3>
    <div class="list-group">
      <!-- Loop through trips -->
      <div
        v-for="(trip, index) in profile.trips"
        :key="index"
        class="list-group-item shadow-sm mb-3 rounded trip-item"
      >
        <!-- Trip Details -->
        <div class="row align-items-center">
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
          <div class="col-md-6 text-md-end">
            <p class="trip-details">
              <strong>Price:</strong> ${{ trip.price }}
            </p>
          </div>
        </div>

        <!-- Reservations -->
        <div class="reservations mt-3" v-if="trip.reservationIds.length > 0">
          <h6 class="text-highlight">Reservations</h6>
          <ul class="list-group">
            <li
              v-for="(reservation, idx) in trip.reservationIds"
              :key="idx"
              class="list-group-item reservation-item"
            >
              <p><strong>Comment:</strong> {{ reservation.comment || 'No comment' }}</p>
              <p><strong>Rating:</strong> {{ reservation.rating || 'No rating' }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Card Styling */
.profile-card,
.vehicle-card {
  background: linear-gradient(90deg, #e3f2fd, #bbdefb); /* Light blue gradient */
  color: #0d47a1; /* Dark blue text */
  border: none;
  border-radius: 10px;
}

.trip-item {
  background: linear-gradient(90deg, #e3f2fd, #bbdefb);
  border: none;
  color: #0d47a1;
  padding: 20px;
  transition: transform 0.2s ease, background 0.2s ease;
}

.trip-item:hover {
  transform: scale(1.02);
  background: linear-gradient(90deg, #bbdefb, #90caf9);
}

.profile-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #0d47a1;
}

.text-highlight {
  color: #ffcc00;
}

/* Reservations */
.reservation-item {
  background-color: #ffffff;
  border: 1px solid #ddd;
  padding: 15px;
  margin-top: 5px;
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