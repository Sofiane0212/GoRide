/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref, computed } from 'vue'
import apiServices from '@/services/apiServices'
import { defineStore } from 'pinia'
import type {ITrip} from '@/shared/interfaces/Trip.interface'
import type Trip from '@/shared/interfaces/Trip.interface'

export const useTripStore = defineStore('Trips', {
  state: () => ({
    trips : [] as ITrip[]
  }),
  getters: {
    getTrips: (state): ITrip[] => state.trips
  },
  actions: {
    async fetchTrips() {
      try {
        const response = await apiServices.get('/trips')
        this.trips = response.data as ITrip[]
        // console.log(this.trips)
      } catch (error) {
        console.error('Failed to fetch Trips:', error)
      }
    },
  },
})
