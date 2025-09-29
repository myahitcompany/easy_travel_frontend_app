import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { PaginatedBookings } from "utilities";
import { BookingsListRow } from "./BookingsListRow";

export function BookingsListTable({
  bookings,
}: {
  bookings: PaginatedBookings;
}) {
  return (
    <TableContainer
      className="rounded-t-xl"
      sx={{ maxHeight: 400, overflow: "auto" }}
      component={Paper}
    >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
        <TableBody className="">
          {bookings.results.map((booking) => (
            <BookingsListRow booking={booking} key={booking.pk} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
