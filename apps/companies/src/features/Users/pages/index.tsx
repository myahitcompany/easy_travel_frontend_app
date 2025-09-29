import { useSetPageMeta } from "@/hooks";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { Edit, Trash, AddSquare, ToggleOnCircle, ToggleOffCircle } from "iconsax-react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Button, Chip, CircularProgress, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { AddUser, DeleteUser, UpdateUser, ToggleUserStatus } from "../components";
import { User } from "../types";
import { usersApi } from "../services";

export function Users() {
  useSetPageMeta({
    title: "Users",
  });

  // États pour les utilisateurs
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // États pour les modales
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openToggleStatus, setOpenToggleStatus] = useState(false);

  // Gestionnaires d'événements pour les modales
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenDelete = (user: User) => {
    setSelectedUser(user);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedUser(null);
  };

  const handleOpenUpdate = (user: User) => {
    setSelectedUser(user);
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedUser(null);
  };

  const handleOpenToggleStatus = (user: User) => {
    setSelectedUser(user);
    setOpenToggleStatus(true);
  };
  const handleCloseToggleStatus = () => {
    setOpenToggleStatus(false);
    setSelectedUser(null);
  };

  // Fonction pour charger les utilisateurs
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await usersApi.getUsers();
      setUsers(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors du chargement des utilisateurs");
    } finally {
      setLoading(false);
    }
  };

  // Chargement initial des utilisateurs
  useEffect(() => {
    loadUsers();
  }, []);

  // Fonction pour formater la date
  const formatDate = (dateObj: { date: string }) => {
    return new Date(dateObj.date).toLocaleDateString('fr-FR');
  };

  // Fonction pour obtenir la couleur du chip selon le groupe
  const getGroupColor = (group: string) => {
    switch (group) {
      case 'administrator': return 'error';
      case 'manager': return 'warning';
      case 'booking_manager': return 'info';
      default: return 'default';
    }
  };

  // Fonction pour obtenir le label du groupe
  const getGroupLabel = (group: string) => {
    switch (group) {
      case 'administrator': return 'Administrateur';
      case 'manager': return 'Manager';
      case 'booking_manager': return 'Gest. Réservations';
      default: return group;
    }
  };

  return (
    <div className="pt-24 px-10">
      <div className="flex justify-end mb-9">
        <Button
          onClick={handleOpenAdd}
          className="bg-primary-orange-100 rounded-[10px] h-10 normal-case"
          startIcon={<AddSquare className="w-5 h-5" />}
          variant="contained"
        >
          Ajouter un utilisateur
        </Button>
      </div>

      {error && (
        <Alert severity="error" className="!mb-4">
          {error}
        </Alert>
      )}

      <div>
        <TableContainer className="!rounded-t-xl" component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead className="bg-[#0A1952]">
              <TableRow>
                <TableCell className="!text-white !text-xs !pl-6 !pt-3.5 !pb-3.5">
                  Utilisateur
                </TableCell>
                <TableCell align="center" className="!text-white !text-xs">
                  Groupe
                </TableCell>
                <TableCell align="center" className="!text-white !text-xs">
                  Compagnie
                </TableCell>
                <TableCell align="center" className="!text-white !text-xs">
                  Statut
                </TableCell>
                <TableCell align="center" className="!text-white !text-xs">
                  Date de création
                </TableCell>
                <TableCell align="right" className="!text-white !text-xs">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" className="!p-8">
                    <CircularProgress size={40} />
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" className="!p-8 !text-gray-500">
                    Aucun utilisateur trouvé
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="!p-4" component="th" scope="row">
                      <div className="flex flex-row items-center space-x-3">
                        <Avatar
                          sx={{ width: 32, height: 32, bgcolor: '#0A1952' }}
                        >
                          {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="!text-sm !text-[#0A1952] font-medium">
                            {user.first_name} {user.last_name}
                          </p>
                          <p className="!text-sm !text-gray-600">
                            {user.email}
                          </p>
                          <p className="!text-xs !text-gray-500">
                            @{user.username}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="center" className="!p-4">
                      <Chip
                        label={getGroupLabel(user.groups[0])}
                        color={getGroupColor(user.groups[0]) as any}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center" className="!p-4">
                      <p className="!text-sm !text-[#0A1952]">
                        {user.company_name}
                      </p>
                    </TableCell>
                    <TableCell align="center" className="!p-4">
                      <Chip
                        label={user.is_active === "1" ? "Actif" : "Inactif"}
                        color={user.is_active === "1" ? "success" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center" className="!p-4">
                      <p className="!text-sm !text-gray-600">
                        {formatDate(user.created_at)}
                      </p>
                    </TableCell>
                    <TableCell align="right" className="!p-4">
                      <div className="flex justify-end space-x-2 !cursor-pointer">
                        {user.is_active === "1" ? (
                          <ToggleOnCircle
                            onClick={() => handleOpenToggleStatus(user)}
                            size={20}
                            color="#22c55e"
                          />
                        ) : (
                          <ToggleOffCircle
                            onClick={() => handleOpenToggleStatus(user)}
                            size={20}
                            color="#6b7280"
                          />
                        )}
                        <Edit
                          onClick={() => handleOpenUpdate(user)}
                          size={20}
                          color="#0A1952"
                        />
                        <Trash
                          onClick={() => handleOpenDelete(user)}
                          size={20}
                          color="#ef4444"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack spacing={2} className="flex justify-center items-center pt-5">
          <Pagination count={Math.ceil(users.length / 10)} variant="outlined" shape="rounded" />
        </Stack>

        {/* Modales */}
        <AddUser
          open={openAdd}
          handleClose={handleCloseAdd}
          onUserCreated={loadUsers}
        />

        <UpdateUser
          open={openUpdate}
          handleClose={handleCloseUpdate}
          user={selectedUser}
          onUserUpdated={loadUsers}
        />

        <DeleteUser
          open={openDelete}
          handleClose={handleCloseDelete}
          user={selectedUser}
          onUserDeleted={loadUsers}
        />

        <ToggleUserStatus
          open={openToggleStatus}
          handleClose={handleCloseToggleStatus}
          user={selectedUser}
          onStatusToggled={loadUsers}
        />
      </div>
    </div>
  );
}
