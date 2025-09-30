import { useEffect, useState } from "react";
import { useSetPageMeta } from "@/hooks";
import { Edit, Trash, AddSquare } from "iconsax-react";
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
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { DeleteLine } from "../components";
import { linesApi } from "../services";
import { Line } from "../types";
import { List, TrendingUp } from "lucide-react";


export function LinesPage() {
  useSetPageMeta({
    title: "Lignes",
  });

  const navigate = useNavigate();

  const [lines, setLines] = useState<Line[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(1);

  const handleOpenDeleteModal = (lineId: string) => {
    setSelectedLineId(lineId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedLineId(null);
    setOpenDeleteModal(false);
  };

  const fetchLines = async () => {
    try {
      setLoading(true);
      const response = await linesApi.getLines(page, 50);
      setLines(response.data);
      setTotalPages(Math.ceil(response.pagination.total / response.pagination.limit));
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors du chargement des lignes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLines();
  }, [page]);

  const handleAddLine = () => {
    navigate("addline");
  };

  const handleEditLine = (lineId: string) => {
    navigate(`updateline/${lineId}`);
  };

  const handleToggleStatus = async (lineId: string) => {
    try {
      await linesApi.toggleLineStatus(lineId);
      fetchLines(); // Recharger la liste
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors du changement de statut");
    }
  };

  const handleDeleteLine = async () => {
    if (!selectedLineId) return;

    try {
      await linesApi.deleteLine(selectedLineId);
      handleCloseDeleteModal();
      fetchLines(); // Recharger la liste
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la suppression");
    }
  };

  const getDayName = (dayNumber: string): string => {
    const days: { [key: string]: string } = {
      "1": "Lun",
      "2": "Mar",
      "3": "Mer",
      "4": "Jeu",
      "5": "Ven",
      "6": "Sam",
      "7": "Dim",
    };
    return days[dayNumber] || "";
  };

  const formatSchedule = (schedule: any) => {
    return Object.entries(schedule).map(([day, times]) => (
      <Chip
        key={day}
        label={`${getDayName(day)} | ${(times as string[]).join(" - ")}`}
        size="medium"
        sx={{
          fontSize: "0.875rem",
          backgroundColor: "#D1D5DB",
          color: "#1E3A8A",
        }}
      />
    ));
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    if (newValue === 0) {
      navigate("/lines/popular");
    }
  };

  if (loading) {
    return (
      <div className="pt-24 px-10 flex justify-center items-center min-h-[400px]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="pt-24 px-10 ">
      {error && (
        <Alert severity="error" className="mb-4" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Onglets de navigation */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
        <div className="flex justify-between items-center">
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="lignes navigation tabs"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 500,
                color: "#6B7280",
              },
              "& .Mui-selected": {
                color: "#D63A00 !important",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#D63A00",
              },
            }}
          >
            <Tab
              icon={<TrendingUp size={20} />}
              iconPosition="start"
              label="Lignes Populaires"
            />
            <Tab
              icon={<List size={20} />}
              iconPosition="start"
              label="Toutes les Lignes"
            />
          </Tabs>

          <div className="flex space-x-4">
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
      </Box>

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
            {lines.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" className="p-8">
                  <div className="text-gray-500">Aucune ligne disponible</div>
                </TableCell>
              </TableRow>
            ) : (
              lines.map((line) => (
                <TableRow
                  key={line.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className=""
                >
                  <TableCell className="p-4" component="th" scope="row">
                    <div className="text-sm text-seondary-bleu-100 leading-sm font-medium font-chakra">
                      {line.origin_city.toUpperCase()}
                    </div>
                  </TableCell>
                  <TableCell
                    align="right"
                    className="p-4 text-sm text-seondary-bleu-100 leading-sm font-medium font-chakra"
                  >
                    {line.destination_city.toUpperCase()}
                  </TableCell>
                  <TableCell
                    align="right"
                    className="p-4 text-sm text-seondary-bleu-100 leading-sm font-medium font-chakra"
                  >
                    {line.intermediate_stops.join(", ").toUpperCase()}
                  </TableCell>
                  <TableCell align="center" className="p-4">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {formatSchedule(line.schedule)}
                    </div>
                  </TableCell>
                  <TableCell align="center" className="p-4">
                    <div className="flex justify-center">
                      <Chip
                        label={line.is_active === "1" ? "Actif" : "Non actif"}
                        size="medium"
                        onClick={() => handleToggleStatus(line.id)}
                        sx={{
                          borderRadius: "8px",
                          fontSize: "0.875rem",
                          height: "32px",
                          backgroundColor: line.is_active === "1" ? "#d4edda" : "#f8d7da",
                          color: line.is_active === "1" ? "#155724" : "#721c24",
                          cursor: "pointer",
                          "&:hover": {
                            opacity: 0.8,
                          },
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell align="right" className="p-4">
                    <div className="flex justify-end space-x-3 cursor-pointer">
                      <Edit
                        onClick={() => handleEditLine(line.id)}
                        size={24}
                        color="#0A1952"
                      />
                      <Trash
                        onClick={() => handleOpenDeleteModal(line.id)}
                        size={24}
                        color="#0A1952"
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
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
      <div>
        <DeleteLine
          openDeleteModal={openDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          onConfirm={handleDeleteLine}
        />
      </div>
    </div>
  );
}