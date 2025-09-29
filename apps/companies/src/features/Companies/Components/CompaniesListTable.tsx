import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { CompanyRow } from "./CompanyRow";
import { Agency } from "../types";

export function CompaniesListTable({ agencies }: { agencies: Agency[] }) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
      <Table size="small">
        <TableHead className="bg-secondary-bleu-100">
          <TableRow>
            <TableCell className="!text-white !text-xs">Nom de l'agence</TableCell>
            <TableCell className="!text-white !text-xs">Téléphone</TableCell>
            <TableCell className="!text-white !text-xs">Adresse</TableCell>
            <TableCell className="!text-white !text-xs">Ville d'intervention</TableCell>
            <TableCell className="!text-white !text-xs">Jour d'ouverture</TableCell>
            <TableCell className="!text-white !text-xs">Statut de l'agence</TableCell>
            <TableCell className="!text-white !text-xs"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agencies.map((agency) => (
            <CompanyRow agency={agency} key={agency.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}