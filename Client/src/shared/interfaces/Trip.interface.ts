import type { IReservation } from "./Reservation.interface"
import type { IVehicle } from "./Vehicle.interface"

export interface ITrip {
    _id: string
    vehicleId: IVehicle
    reservationIds: IReservation[]
    origin: string
    destination: string
    departureTime: Date
    arrivalTime: Date
    price: number
    status: string
    createdAt: Date
}

export default interface Trip {
    _id: string
    vehicleId: string
    reservationIds: string[]
    origin: string
    destination: string
    departureTime: Date
    arrivalTime: Date
    price: number
    status: string
    createdAt: Date
}