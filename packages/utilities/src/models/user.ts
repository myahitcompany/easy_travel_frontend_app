import { BaseEntity } from "./base";



export interface User extends BaseEntity {
  first_name: string;
  last_name: string;
  email: string;
  pk: string;
  groups:Groups[];

  
}

export interface Groups{
  pk: number;
  name: string;
}

export type Users = User[];

export interface PaginatedUsers {
  count: number
  next: any
  previous: any
  results: User[]
}