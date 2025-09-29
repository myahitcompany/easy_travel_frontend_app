import { useSetPageMeta } from "@/hooks";
import { useState } from "react";
import { Button, Pagination, Stack } from "@mui/material";
import { Filter, AddCircle } from "iconsax-react";
import { CompaniesListTable } from "../../components/CompaniesListTable";
import { Agency } from "../../types";
import { useNavigate } from "react-router-dom";

export type Agency = {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  status: "Actif" | "Non actif";
  days: string[];
};

export function Companies() {
  useSetPageMeta({ title: "Agences" });
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Données simulées des agences
  const agencies: Agency[] = [
    { id: "01", name: "AGENCE 01", phone: "0152487635", address: "Adresse01", city: "PARAKOU", status: "Actif", days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"] },
    { id: "02", name: "AGENCE 02", phone: "0177586234", address: "Adresse02", city: "COTONOU", status: "Actif", days: ["Lun", "Mar", "Jeu", "Ven", "Sam"] },
    { id: "03", name: "AGENCE 03", phone: "0149755211", address: "Adresse03", city: "PORTO-NOVO", status: "Non actif", days: ["Lun", "Mar", "Mer", "Ven", "Sam"] },
    { id: "04", name: "AGENCE 04", phone: "0112406582", address: "Adresse04", city: "OUIDAH", status: "Actif", days: ["Lun", "Mar", "Jeu", "Ven", "Sam"] },
    { id: "05", name: "AGENCE 05", phone: "0132456865", address: "Adresse05", city: "PARAKOU", status: "Actif", days: ["Mar", "Mar", "Jeu", "Ven"] },
    { id: "06", name: "AGENCE 06", phone: "0114416532", address: "Adresse06", city: "BEMÈRÈKÈ", status: "Non actif", days: ["Lun", "Mar", "Mer", "Jeu", "Ven"] },
    { id: "07", name: "AGENCE 07", phone: "0145257869", address: "Adresse07", city: "COMÉ", status: "Actif", days: ["Lun", "Mar", "Mer", "Jeu", "Sam"] },
  ];

  // Pagination
  const totalPages = 1;

  return (
    <div className="p-6">
      <div className="flex items-center mb-8 justify-end">
        <div className="flex gap-2 ">
          <Button variant="contained" className="bg-primary-orange-100 normal-case rounded-lg" startIcon={<Filter />}>
            Filtre
          </Button>
          <Button
            variant="contained"
            className="bg-primary-orange-100 normal-case rounded-lg"
            startIcon={<AddCircle />}
            onClick={() => navigate("/companies/add")}
          >
            Ajouter une Agence
          </Button>
        </div>
      </div>
      <CompaniesListTable agencies={agencies} />
      {/* Pagination */}
      <Stack spacing={2} className="flex justify-center items-center pt-5">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, value) => setCurrentPage(value)}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </div>
  );
}
