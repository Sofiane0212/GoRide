<script setup lang="ts">
  import { ref } from 'vue';
  import apiServices from '@/services/apiServices'; // Replace with your actual service
  
  // Form state
  const form = ref({
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    price: '',
    vehicleId: '',
  });
  
  // List of vehicles (mock or fetched from API)
  const vehicles = ref([
    { _id: '1', make: 'Toyota', model: 'Corolla', seats: 4 },
    { _id: '2', make: 'Honda', model: 'Civic', seats: 4 },
  ]); // Replace with actual API call if needed
  
  // Submit logic
  const submitTrip = async () => {
    try {
      const response = await apiServices.post('/trips', form.value);
      console.log('Trip created successfully:', response.data);
      alert('Trip created successfully!');
      resetForm();
    } catch (error) {
      console.error('Failed to create trip:', error);
      alert('Failed to create trip.');
    }
  };
  
  // Reset form after submission
  const resetForm = () => {
    form.value = {
      origin: '',
      destination: '',
      departureTime: '',
      arrivalTime: '',
      price: '',
      vehicleId: '',
    };
  };
</script>

<template>
    <div class="container my-5">
      <h3 class="text-center mb-4 text-highlight">Create a New Trip</h3>
  
      <!-- Form -->
      <form @submit.prevent="submitTrip" class="card shadow-sm p-4 form-container">
        <!-- Origin -->
        <div class="mb-3">
          <label for="origin" class="form-label">Origin</label>
          <input
            type="text"
            id="origin"
            v-model="form.origin"
            class="form-control"
            placeholder="Enter origin"
            required
          />
        </div>
  
        <!-- Destination -->
        <div class="mb-3">
          <label for="destination" class="form-label">Destination</label>
          <input
            type="text"
            id="destination"
            v-model="form.destination"
            class="form-control"
            placeholder="Enter destination"
            required
          />
        </div>
  
        <!-- Departure Time -->
        <div class="mb-3">
          <label for="departureTime" class="form-label">Departure Time</label>
          <input
            type="datetime-local"
            id="departureTime"
            v-model="form.departureTime"
            class="form-control"
            required
          />
        </div>
  
        <!-- Arrival Time -->
        <div class="mb-3">
          <label for="arrivalTime" class="form-label">Arrival Time</label>
          <input
            type="datetime-local"
            id="arrivalTime"
            v-model="form.arrivalTime"
            class="form-control"
            required
          />
        </div>
  
        <!-- Price -->
        <div class="mb-3">
          <label for="price" class="form-label">Price</label>
          <input
            type="number"
            id="price"
            v-model="form.price"
            class="form-control"
            placeholder="Enter price in USD"
            min="0"
            step="0.01"
            required
          />
        </div>
  
        <!-- Vehicle -->
        <div class="mb-3">
          <label for="vehicle" class="form-label">Select Vehicle</label>
          <select
            id="vehicle"
            v-model="form.vehicleId"
            class="form-select"
            required
          >
            <option v-for="vehicle in vehicles" :key="vehicle._id" :value="vehicle._id">
              {{ vehicle.make }} {{ vehicle.model }} (Seats: {{ vehicle.seats }})
            </option>
          </select>
        </div>
  
        <!-- Submit Button -->
        <div class="text-center mt-4">
          <button type="submit" class="btn btn-highlight">Create Trip</button>
        </div>
      </form>
    </div>
  </template>
  
  <style scoped>
  /* Form Container */
  .form-container {
    background: linear-gradient(90deg, #e3f2fd, #bbdefb); /* Light blue gradient */
    border: none;
    border-radius: 10px;
    color: #0d47a1;
  }
  
  /* Highlight Button */
  .btn-highlight {
    background-color: #ffcc00; /* Yellow */
    color: #0d47a1;
    font-weight: bold;
    border: none;
  }
  
  .btn-highlight:hover {
    background-color: #e6b800; /* Darker yellow */
  }
  
  /* Input Fields */
  .form-control,
  .form-select {
    border-radius: 5px;
  }
  
  .text-highlight {
    color: #ffcc00;
  }
  </style>
  