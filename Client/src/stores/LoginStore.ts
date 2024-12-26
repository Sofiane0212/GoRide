import apiServices from '@/services/apiServices';
import type { ITrip } from '@/shared/interfaces/Trip.interface';
import { defineStore } from 'pinia';

export const useLoginStore = defineStore('Login', {
    state: () => ({
        previousView: '' as string,
        username: '' as string,
        userId: '' as string,
    }),
    getters: {
        getPreviousView: (state) => state.previousView,
        getUserName: (state) => state.username,
        getUserId: (state) => state.userId,
    },
    actions: {
        setPreviousView(inView: string) {
            this.previousView = inView;
        },
        setUserName(newName: string) {
            this.username = newName;
        },
        setUserId(inID: string) {
            this.userId = inID;
        },
        async fetchProfile() {
            if (this.userId !== '') {
                try {
                    const response = await apiServices.get('/users/' + this.userId);
        
                    if (response.data) {
                        const { user, vehicle, trips } = response.data;
        
                        // Filter and sort trips
                        const filteredTrips = trips
                            .filter((trip: ITrip) => 
                                trip.status === 'scheduled' || trip.status === 'completed'
                            )
                            .sort((a: ITrip, b: ITrip) => {
                                // Prioritize scheduled trips
                                if (a.status === 'scheduled' && b.status !== 'scheduled') return -1;
                                if (b.status === 'scheduled' && a.status !== 'scheduled') return 1;
        
                                // Sort by departureTime (most recent first)
                                return new Date(b.departureTime).getTime() - new Date(a.departureTime).getTime();
                            });
        
                        return { found: true, user, vehicle, trips: filteredTrips };
                    }
        
                    return { found: false, user: {}, vehicle: null, trips: [] };
                } catch (error) {
                    console.error('Failed to fetch Profile:', error);
                    return { found: false, user: {}, vehicle: null, trips: [] };
                }
            } else {
                return { found: false, user: {}, vehicle: null, trips: [] };
            }
        }
    }
})