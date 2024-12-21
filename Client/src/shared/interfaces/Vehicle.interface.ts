import type { IUser } from "./User.interface";

export interface IVehicle {
    userId: IUser
    make: string
    model: string
    seats: number
    year: Date
    licensePlate: string
    createdAt: Date
}

export default interface Vehicle {
    userId: string
    make: string
    model: string
    seats: number
    year: Date
    licensePlate: string
    createdAt: Date
}