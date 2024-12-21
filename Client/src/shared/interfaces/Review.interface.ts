import type { ITrip } from "./Trip.interface"
import type { IUser } from "./User.interface"

export interface IReview {
    _id: string
    tripId: ITrip
    userId: IUser
    rating: number
    comment: string
    createdAt: Date
}

export default interface Review {
    _id: string
    tripId: string
    userId: string
    rating: number
    comment: string
    createdAt: Date
}