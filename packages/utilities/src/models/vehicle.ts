export interface Vehicle {
  pk: string;
  category: string;
  license_plate: string;
  capacity: number | undefined;
  state: string;
  options: Options;
}

export interface Options {
  air_conditioning: boolean
  tv: boolean
  wifi: boolean
  usb: boolean
}

export interface PaginatedVehicles {
  count: number;
  next: any;
  previous: any;
  results: Vehicle[];
}


export interface VehicleResponse {
    pk: string;
    category: string;
    license_plate: string;
    capacity: number | undefined;
    state: string;
    options: any;
  }