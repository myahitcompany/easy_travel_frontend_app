import { Trip } from "./travel"
import { User } from "./user"

export interface Booking {
    pk: string
    trip: Trip
    user: User
    passenger_count: number
    status: string
}


export interface PaginatedBookings{
    count: number
    next: string
    previous: string
    results: Booking[]
}


export interface BookingPayload {
    trip: string;
    passenger_count:number | null;
    user: string;
}