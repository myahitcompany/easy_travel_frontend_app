import { TableRow, TableCell, IconButton } from "@mui/material";
import { Edit, Trash } from "iconsax-react";
import { Agency } from "../types";
import { useNavigate } from "react-router-dom";

export function CompanyRow({ agency }: { agency: Agency }) {
  const navigate = useNavigate();

  const renderDayPill = (day: string, time: string = "09:00 - 18:00") => (
    <span className="inline-block bg-[#E6E8F0] text-[#3D3D3D] text-xs rounded-full px-2 py-1 mr-1 mb-1">
      {day} | {time}
    </span>
  );

  return (
    <TableRow>
      <TableCell>{agency.name}</TableCell>
      <TableCell>{agency.phone}</TableCell>
      <TableCell>{agency.address}</TableCell>
      <TableCell>{agency.city}</TableCell>
      <TableCell>
        <div className="flex flex-wrap">
          {agency.days.map((day) => renderDayPill(day))}
        </div>
      </TableCell>
      <TableCell>
        <span className={`px-3 py-1 rounded-full ${agency.status === 'Actif' ? 'bg-[#E1F5E9] text-[#0D9E6D]' : 'bg-[#FCDEDE] text-[#D63A00]'}`}>
          {agency.status}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <IconButton size="small" onClick={() => navigate(`/companies/update/${agency.id}`)}>
            <Edit size={20} color="#0A1952" />
          </IconButton>
          <IconButton size="small">
            <Trash size={20} color="#0A1952" />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  );
}