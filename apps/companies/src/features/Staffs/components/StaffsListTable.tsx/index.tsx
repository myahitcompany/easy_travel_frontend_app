import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { PaginatedUsers } from "utilities";
import { StaffsListRow } from "./StaffsListRow";

export function StaffsListTable({ users }: { users: PaginatedUsers }) {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 400, overflow: "auto" }}
      className="!rounded-t-xl"
    >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead sx={{ backgroundColor: "#0A1952" }} className="bg-[#0A1952]">
          <TableRow>
            <TableCell className="!text-white !text-xs !pl-6 !pt-3.5 !pb-3.5">
              Profile
            </TableCell>
            <TableCell align="right" className="!text-white !text-xs">
              Rôle
            </TableCell>
            <TableCell
              align="right"
              className="!text-white !text-xs"
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.results?.map((user) => (
            <StaffsListRow user={user} key={user.pk} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
