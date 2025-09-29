import { TableHead, TableRow, TableCell } from "@mui/material";

export function BookingsListHeader() {
  return (
    <TableHead className="bg-secondary-bleu-100">
      <TableRow>
        <TableCell className="text-white text-xs pl-6 pt-3.5 pb-3.5">
          Réservations ID
        </TableCell>
        <TableCell
          align="right"
          className="text-white text-xs leading-xs font-medium font-chakra"
        >
          Ville de départ
        </TableCell>
        <TableCell
          align="right"
          className="text-white text-xs leading-xs font-medium font-chakra"
        >
          Ville d’arrivée
        </TableCell>
        <TableCell
          align="right"
          className="text-white text-xs leading-xs font-medium font-chakra"
        >
          Points d’arrêts
        </TableCell>
        <TableCell
          align="right"
          className="text-white text-xs leading-xs font-medium font-chakra"
        >
          Chauffeur
        </TableCell>
        <TableCell
          align="right"
          className="text-white text-xs leading-xs font-medium font-chakra"
        >
          Bus
        </TableCell>
        <TableCell
          align="right"
          className="text-white text-xs leading-xs font-medium font-chakra"
        ></TableCell>
      </TableRow>
    </TableHead>
  );
}
