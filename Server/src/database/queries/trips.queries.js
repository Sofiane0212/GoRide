import Trip from "../models/trip.model.js"
import User from "../models/user.model.js"
import Vehicle from "../models/vehicle.model.js"
import Reservation from "../models/reservation.model.js"

export const getPopulatedTrips = async () => {
    try {
      const trips = await Trip.find({ status: 'scheduled' })
        .populate({
          path: 'vehicleId', // Populate vehicleId with full IVehicle object
          populate: {
            path: 'userId', // Populate driver (IUser) inside IVehicle
            model: 'User',
          },
        })
        .populate({
          path: 'reservationIds', // Populate reservationIds with IReservation objects
          populate: {
            path: 'userId', // Populate userId (passenger) inside IReservation
            model: 'User',
          },
        });
      return trips;
    } catch (error) {
      console.error('Error fetching populated trips:', error);
      throw error;
    }
  };
  