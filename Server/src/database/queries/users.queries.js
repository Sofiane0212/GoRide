import Trip from "../models/trip.model.js"
import User from "../models/user.model.js"
import Vehicle from "../models/vehicle.model.js"
import Reservation from "../models/reservation.model.js"

// get a profile by ID
export const getProfileQuery = async (id) => {
    try {
        const user = await User.findById(id);

        if (!user) {
        throw new Error('User not found');
        }

        // Fetch the vehicle associated with the user (if any)
        const vehicle = await Vehicle.findOne({ userId: user._id });

        // If no vehicle exists, return only the user
        if (!vehicle) {
        return { user, vehicle: null, trips: [] };
        }

        // Fetch trips associated with the vehicle
        const trips = await Trip.find({ vehicleId: vehicle._id })
        .populate({
            path: 'reservationIds', // Populate reservations for each trip
            populate: {
            path: 'userId', // Populate user for each reservation
            model: 'User',
            },
        });

        return { user, vehicle, trips };
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
}