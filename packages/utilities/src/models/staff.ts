export interface CreateStaffPayload {
    first_name: string;
    last_name: string;
    email: string;
    groups: {
      add: number[];
    };
  }
  

export interface Group {
    pk: number;
    name: string;
}
export interface PaginatedGroup {
    count: number,
    next: number,
    previous: number,
    results: Group[];
}



export interface CreateStaffResponse {
    first_name: string;
    last_name: string;
    email: string;
    pk: string;
    groups: Group[];
    company: string;
}