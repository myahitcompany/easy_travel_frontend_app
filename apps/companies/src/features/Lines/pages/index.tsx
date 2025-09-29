import React from "react";
import { useSetPageMeta } from "@/hooks";
import { Edit, Trash, AddSquare } from "iconsax-react";
import FileDownloadIcon from '@mui/icons-material/FileDownload'; 
import { useNavigate } from "react-router-dom";
import {
  Button,
  Stack,
  Table,
  Pagination,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  Paper,
  TableBody,
  Chip,
} from "@mui/material";
import { DeleteLine } from "../components";


export function LinesPage() {
  useSetPageMeta({
    title: "Lines",
  });

  const navigate = useNavigate(); 

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  // Sample data to match the image rows
  const linesData = [
    { id: "#001234", status: "Actif" },
    { id: "#001235", status: "Actif" },
    { id: "#001236", status: "Actif" },
    { id: "#001237", status: "Non actif" },
    { id: "#001238", status: "Actif" },

  ];
  const handleAddLine = () =>{
    navigate("addline")
  }
  const handleEditLine = () =>{
    navigate("updateline")
  }

  return (
    <div className="pt-24 px-10 ">
      <div className="flex justify-end mb-9">
  
        <div className="flex space-x-4">
          <Button
            className="bg-primary-orange-100 rounded-[10px] h-10 normal-case"
            startIcon={<FileDownloadIcon className="w-5 h-5" />}
            variant="contained"
          >
            Exporter
          </Button>
          <Button
            onClick={handleAddLine}
            className="bg-primary-orange-100 rounded-[10px] h-10 normal-case"
            startIcon={<AddSquare className="w-5 h-5" />}
            variant="contained"
          >
            Ajouter une ligne
          </Button>
        </div>
      </div>

      <TableContainer className="rounded-t-xl" component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead className="bg-secondary-bleu-100">
            <TableRow>
              <TableCell className="text-white text-xs pl-6 pt-3.5 pb-3.5">
                Ville de départ
              </TableCell>
              <TableCell
                align="right"
                className="text-white text-xs leading-xs font-medium font-chakra"
              >
                Ville d'arrivée
              </TableCell>
              <TableCell
                align="right"
                className="text-white text-xs leading-xs font-medium font-chakra"
              >
                Points d'arrêts
              </TableCell>
              <TableCell
                align="center"
                className="text-white text-xs leading-xs font-medium font-chakra"
              >
                Jour(s) & heure(s) de départ
              </TableCell>
              <TableCell
                align="center"
                className="text-white text-xs leading-xs font-medium font-chakra"
              >
                Statut de la ligne
              </TableCell>
              <TableCell
                align="right"
                className="text-white text-xs leading-xs font-medium font-chakra"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="">
            {linesData.map((line, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className=""
              >
                <TableCell className="p-4" component="th" scope="row">
                  <div className="text-sm text-seondary-bleu-100 leading-sm font-medium font-chakra">
                    COTONOU
                  </div>
                </TableCell>
                <TableCell
                  align="right"
                  className="p-4 text-sm text-seondary-bleu-100 leading-sm font-medium font-chakra"
                >
                  PARAKOU
                </TableCell>
                <TableCell
                  align="right"
                  className="p-4 text-sm text-seondary-bleu-100 leading-sm font-medium font-chakra"
                >
                  CALAVI, GODOMEY
                </TableCell>
                <TableCell align="center" className="p-4">
                  <div className="flex flex-wrap gap-1 justify-center">
                    <Chip
                      label="Lun | 09:00 - 13:00 - 17:00"
                      size="medium"
                      sx={{ 
                        fontSize: '0.875rem',
                        backgroundColor: '#D1D5DB',
                        color: '#1E3A8A',
                      }}
                    />
                    <Chip
                      label="Mar | 09:00 - 13:00 - 17:00"
                      size="medium"
                      sx={{ 
                        fontSize: '0.875rem',
                        backgroundColor: '#D1D5DB',
                        color: '#1E3A8A',
                      }}
                    />
                    <Chip
                      label="Mer | 09:00 - 13:00"
                      size="medium"
                      sx={{ 
                        fontSize: '0.875rem',
                        backgroundColor: '#D1D5DB',
                        color: '#1E3A8A',
                      }}
                    />
                    <Chip
                      label="Jeu | 09:00 - 13:00"
                      size="medium"
                      sx={{ 
                        fontSize: '0.875rem',
                        backgroundColor: '#D1D5DB',
                        color: '#1E3A8A',
                      }}
                    />
                    <Chip
                      label="Ven | 09:00 - 13:00"
                      size="medium"
                      sx={{ 
                        fontSize: '0.875rem',
                        backgroundColor: '#D1D5DB',
                        color: '#1E3A8A',
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell align="center" className="p-4">
                  <div className="flex justify-center">
                    <Chip
                      label={line.status}
                      size="medium"
                      sx={{ 
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        height: '32px',
                        backgroundColor: line.status === "Actif" ? '#d4edda' : '#f8d7da',
                        color: line.status === "Actif" ? '#155724' : '#721c24'
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell align="right" className="p-4">
                  <div className="flex justify-end space-x-3 cursor-pointer">
                    <Edit
                      onClick={handleEditLine}
                      size={24}
                      color="#0A1952"
                    />
                    <Trash
                      onClick={handleOpenDeleteModal}
                      size={24}
                      color="#0A1952"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2} className="flex justify-center items-center pt-5">
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Stack>
      <div>

        <DeleteLine
          openDeleteModal={openDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
        />
      </div>
    </div>
  );
}