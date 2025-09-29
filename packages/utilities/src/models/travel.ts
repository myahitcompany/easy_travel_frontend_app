export interface TripPayload {
  starting_point: string
  arrival_point: string
  departure: string
  duration: string
  vehicle: string
  price: string
  driver: string
  
}

export interface Trip {
  pk: string
  starting_point: string
  arrival_point: string
  departure: string
  duration: string
  vehicle: string
  price: string
  driver: string
  status: string
  passenger_count: number | null
  vehicle_capacity: number | null
}


export interface PaginatedTrips {
  count: number,
  next: number,
  previous: number,
  results: Trip[];
}