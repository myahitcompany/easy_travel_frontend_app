import { useSetPageMeta } from "@/hooks";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { Edit, Trash, AddSquare } from "iconsax-react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import React from "react";
import { AddDriver, DeleteDriver, UpdateDriverIformation } from "../components";

export function DriversPage() {
  useSetPageMeta({
    title: "Chauffeurs",
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  return (
    <div className="pt-24 px-10">
      <div className="flex justify-end mb-9">
        <Button
          onClick={handleOpen}
          className="bg-primary-orange-100 rounded-[10px] h-10 normal-case"
          startIcon={<AddSquare className="w-5 h-5" />}
          variant="contained"
        >
          Ajouter un chauffeur
        </Button>
        <AddDriver open={open} handleClose={handleClose} />
      </div>

      <div>
        <TableContainer className="!rounded-t-xl" component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            size="small"
            aria-label="a dense table"
            className=""
          >
            <TableHead className="bg-[#0A1952]">
              <TableRow className="">
                <TableCell className="!text-white !text-xs !pl-6 !pt-3.5 !pb-3.5">
                  Chauffeurs
                </TableCell>
                <TableCell align="right" className="!text-white !text-xs">
                  Bus
                </TableCell>
                <TableCell
                  align="right"
                  className="!text-white !text-xs"
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="">
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className=""
              >
                <TableCell className="!p-4" component="th" scope="row">
                  <div className="flex flex-row items-center space-x-3">
                    <div>
                      <Avatar
                        alt="Remy Sharp"
                        src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                        sx={{ width: 32, height: 32 }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="!text-sm !text-[#0A1952]">Olivia Rhye</p>
                      <p className="!text-sm !text-[#0A1952]">
                        olivia@untitledui.com
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="right" className="!p-4">
                  #001
                </TableCell>
                <TableCell align="right" className="!p-4">
                  <div className="flex justify-end space-x-3 !cursor-pointer">
                    <Edit
                      onClick={handleOpenUpdateModal}
                      size={24}
                      color="#0A1952"
                    />
                    <Trash
                      onClick={handleDeleteModal}
                      size={24}
                      color="#0A1952"
                    />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className=""
              >
                <TableCell className="!p-4" component="th" scope="row">
                  <div className="flex flex-row items-center space-x-3">
                    <div>
                      <Avatar
                        alt="Remy Sharp"
                        src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                        sx={{ width: 32, height: 32 }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="!text-sm !text-[#0A1952]">Olivia Rhye</p>
                      <p className="!text-sm !text-[#0A1952]">
                        olivia@untitledui.com
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="right" className="!p-4">
                  #001
                </TableCell>
                <TableCell align="right" className="!p-4">
                  <div className="flex justify-end space-x-3 !cursor-pointer">
                    <div className="flex justify-end space-x-3 !cursor-pointer">
                      <Edit
                        onClick={handleOpenUpdateModal}
                        size={24}
                        color="#0A1952"
                      />
                      <Trash
                        onClick={handleDeleteModal}
                        size={24}
                        color="#0A1952"
                      />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Stack spacing={2} className="flex justify-center items-center pt-5">
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>

        <div>
          <DeleteDriver
            openDeleteModal={openDeleteModal}
            handleCloseDeleteModal={handleCloseDeleteModal}
          />
          <UpdateDriverIformation
            openUpdateModal={openUpdateModal}
            handleCloseUpdateModal={handleCloseUpdateModal}
          />
        </div>
      </div>
    </div>
  );
}
