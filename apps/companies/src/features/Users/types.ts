export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  status?: string | null;
  status_message?: string | null;
  active: boolean;
  last_active?: string | null;
  created_at: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  updated_at: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  deleted_at?: string | null;
  company_id: string;
  phone: string;
  address?: string | null;
  city?: string | null;
  country: string;
  date_of_birth?: string | null;
  gender?: string | null;
  profile_picture?: string | null;
  is_active: string;
  last_login_at?: string | null;
  email_verified_at?: string | null;
  company_name: string;
  groups: string[];
}

export interface CreateUserPayload {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  group: 'administrator' | 'manager' | 'booking_manager';
  phone?: string;
  company_id: number;
}

export interface UpdateUserPayload {
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  group?: 'administrator' | 'manager' | 'booking_manager';
}

export interface UserResponse {
  status: boolean;
  message: string;
  data: User[];
}

export interface UserDetailResponse {
  status: boolean;
  message: string;
  data: {
    user: User;
  };
}

export type UserGroup = 'administrator' | 'manager' | 'booking_manager';

export const USER_GROUPS: { value: UserGroup; label: string }[] = [
  { value: 'administrator', label: 'Administrateur' },
  { value: 'manager', label: 'Manager' },
  { value: 'booking_manager', label: 'Gestionnaire de réservations' },
];