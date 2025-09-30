// Types pour les lignes de transport

export interface LineSchedule {
  "1"?: string[]; // Lundi
  "2"?: string[]; // Mardi
  "3"?: string[]; // Mercredi
  "4"?: string[]; // Jeudi
  "5"?: string[]; // Vendredi
  "6"?: string[]; // Samedi
  "7"?: string[]; // Dimanche
}

export interface Line {
  id: string;
  company_id: string;
  name: string;
  origin_city: string;
  destination_city: string;
  distance_km: number;
  estimated_duration_minutes: string;
  base_price: number;
  child_discount_percentage: number;
  child_age_limit: string;
  luggage_weight_limit_kg: number;
  extra_luggage_price_per_kg: number;
  is_active: string;
  schedule: LineSchedule;
  intermediate_stops: string[];
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface LineResponse {
  status: boolean;
  message: string;
  data: Line[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface LineDetailResponse {
  status: boolean;
  message: string;
  data: {
    line: Line;
  };
}

export interface PopularLinesResponse {
  status: boolean;
  message: string;
  data: {
    popular_lines: Line[];
    analytics: {
      total_lines: number;
      limit_applied: number;
      generated_at: string;
    };
    user_context: {
      company_scope: boolean;
      can_view_other_companies: boolean;
    };
  };
}

export interface CreateLinePayload {
  name: string;
  origin_city: string;
  destination_city: string;
  base_price: number;
  distance_km: number;
  estimated_duration_minutes: number;
  child_discount_percentage?: number;
  child_age_limit?: number;
  luggage_weight_limit_kg?: number;
  extra_luggage_price_per_kg?: number;
  is_active: number;
  schedule: LineSchedule;
  intermediate_stops: string[];
  description: string;
}

export interface UpdateLinePayload extends Partial<CreateLinePayload> {}