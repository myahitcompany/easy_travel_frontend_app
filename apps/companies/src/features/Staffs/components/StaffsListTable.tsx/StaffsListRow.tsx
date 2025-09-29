import { DeleteStaff, UpdateStaffInformation } from "@/features";
import { TableRow, TableCell } from "@mui/material";
import { Edit, Trash } from "iconsax-react";
import React from "react";
import { User } from "utilities";

export function StaffsListRow({ user }: { user: User }) {
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);
  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      className=""
      key={user?.pk}
    >
      <TableCell className="!p-4" component="th" scope="row">
        <div className="flex flex-row items-center space-x-3">
          <div className="flex flex-col font-chakra">
            <div className="text-sm !text-[#0A1952] space-x-1 flex flex-row">
              <p>{user.first_name}</p>
              <p> {user.last_name}</p>
            </div>
            <p className="text-sm !text-[#0A1952]">{user.email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell align="right" className="!p-4 font-chakra">
        <div className="flex flex-row justify-end space-x-2 items-center">
          {user.groups.map((role) => (
            <p className="font-chakra text-sm" key={role.pk}>
              {role.name}
            </p>
          ))}
        </div>
      </TableCell>
      <TableCell align="right" className="!p-4">
        <div className="flex justify-end space-x-3 !cursor-pointer">
          <Edit onClick={handleOpenUpdateModal} size={24} color="#0A1952" />
          <Trash onClick={handleDeleteModal} size={24} color="#0A1952" />

          <div>
            <DeleteStaff
              openDeleteModal={openDeleteModal}
              handleCloseDeleteModal={handleCloseDeleteModal}
              user={user}
            />
            <UpdateStaffInformation
              openUpdateModal={openUpdateModal}
              handleCloseUpdateModal={handleCloseUpdateModal}
              user={user}
            />
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
