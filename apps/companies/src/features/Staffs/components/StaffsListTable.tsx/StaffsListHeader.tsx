import { TableHead, TableRow, TableCell } from "@mui/material";

export function StaffsListHeader() {
  return (
    <TableHead className="bg-[#0A1952]">
      <TableRow>
        <TableCell className="!text-white !text-xs !pl-6 !pt-3.5 !pb-3.5">
          Profile
        </TableCell>
        <TableCell align="right" className="!text-white !text-xs">
          Rôle
        </TableCell>
        <TableCell align="right" className="!text-white !text-xs"></TableCell>
      </TableRow>
    </TableHead>
  );
}
