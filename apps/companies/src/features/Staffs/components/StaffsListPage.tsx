import { Button, Stack, Pagination } from "@mui/material";
import { AddSquare } from "iconsax-react";
import React, { useState } from "react";
import { AddStaff } from "./AddStaff";
import { StaffsListTable, useGetUsers } from "@/features";

export function StaffsListPage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [page, setPage] = useState(1);

  const { data: users } = useGetUsers(page);

 const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
   setPage(value);
 };
 

  return (
    <div className="pt-24 px-10">
      <div className="flex justify-end mb-9">
        <Button
          onClick={handleOpen}
          className="bg-primary-orange-100 rounded-[10px] h-10 normal-case"
          startIcon={<AddSquare className="w-5 h-5" />}
          variant="contained"
        >
          Ajouter un employé
        </Button>
        <AddStaff open={open} handleClose={handleClose} />
      </div>
      {users && (
        <>
          <StaffsListTable users={users} />

          <Stack spacing={2} className="flex justify-center items-center pt-5">
            <Pagination
              count={Math.ceil(users.count / users.results.length)}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </>
      )}
    </div>
  );
}
