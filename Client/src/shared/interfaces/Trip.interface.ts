import type { IUser } from "./User.interface"
import type { IVehicle } from "./Vehicle.interface"

export interface ITrip {
    _id: string
    vehicleId: IVehicle
    reviewIds: IUser[]
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
    reviewIds: string[]
    origin: string
    destination: string
    departureTime: Date
    arrivalTime: Date
    price: number
    status: string
    createdAt: Date
}