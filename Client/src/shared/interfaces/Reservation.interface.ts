import type { ITrip } from "./Trip.interface"
import type { IUser } from "./User.interface"

export interface IReservation {
    _id: string
    tripId: ITrip
    userId: IUser
    rating: number
    comment: string
    createdAt: Date
}

export default interface Reservation {
    _id: string
    tripId: string
    userId: string
    rating: number
    comment: string
    createdAt: Date
}