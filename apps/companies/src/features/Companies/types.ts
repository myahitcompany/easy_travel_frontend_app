export type Agency = {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  status: "Actif" | "Non actif";
  days: string[];
};