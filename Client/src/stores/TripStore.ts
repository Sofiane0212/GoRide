/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {ITrip} from '@/shared/interfaces/Trip.interface'
import type Trip from '@/shared/interfaces/Trip.interface'

export const useTripStore = defineStore('Trips', {
  state: () => ({
    trips : [] as ITrip[]
  }),
  getters: {
    getTrips: (state) => state.trips
  },
  actions: {},
})
