import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import { TrendingUp, MapPin, Clock, DollarSign } from "lucide-react";
import { linesApi } from "../services";
import { Line } from "../types";

interface PopularLinesProps {
  limit?: number;
}

export function PopularLines({ limit = 5 }: PopularLinesProps) {
  const [popularLines, setPopularLines] = useState<Line[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularLines = async () => {
      try {
        setLoading(true);
        const response = await linesApi.getPopularLines(limit);
        setPopularLines(response.data.popular_lines);
        setError(null);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            "Erreur lors du chargement des lignes populaires"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPopularLines();
  }, [limit]);

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

  if (loading) {
    return (
      <Box className="flex justify-center items-center py-8">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" className="mb-4">
        {error}
      </Alert>
    );
  }

  if (popularLines.length === 0) {
    return (
      <Box className="py-8 text-center">
        <Typography variant="body1" color="textSecondary">
          Aucune ligne populaire disponible
        </Typography>
      </Box>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={24} color="#D63A00" />
        <Typography
          variant="h6"
          className="font-bold"
          sx={{ color: "#0A1952" }}
        >
          Lignes populaires
        </Typography>
      </div>

      <Grid container spacing={3}>
        {popularLines.map((line) => (
          <Grid item xs={12} sm={6} md={4} key={line.id}>
            <Card
              className="h-full hover:shadow-lg transition-shadow"
              sx={{
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
              }}
            >
              <CardContent>
                {/* En-tête avec le nom et le statut */}
                <div className="flex justify-between items-start mb-3">
                  <Typography
                    variant="h6"
                    className="font-bold"
                    sx={{
                      color: "#0A1952",
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                  >
                    {line.name}
                  </Typography>
                  <Chip
                    label={line.is_active === "1" ? "Actif" : "Non actif"}
                    size="small"
                    sx={{
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      height: "24px",
                      backgroundColor:
                        line.is_active === "1" ? "#d4edda" : "#f8d7da",
                      color: line.is_active === "1" ? "#155724" : "#721c24",
                    }}
                  />
                </div>

                {/* Trajet */}
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={16} color="#6B7280" />
                  <Typography
                    variant="body2"
                    sx={{ color: "#6B7280", fontSize: "14px" }}
                  >
                    {line.origin_city} → {line.destination_city}
                  </Typography>
                </div>

                {/* Points d'arrêt intermédiaires */}
                {line.intermediate_stops.length > 0 && (
                  <div className="mb-3">
                    <Typography
                      variant="caption"
                      sx={{ color: "#9CA3AF", fontSize: "12px" }}
                    >
                      Arrêts: {line.intermediate_stops.join(", ")}
                    </Typography>
                  </div>
                )}

                {/* Prix et durée */}
                <div className="flex items-center justify-between mb-3 p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-1">
                    <DollarSign size={16} color="#D63A00" />
                    <Typography
                      variant="body2"
                      sx={{ color: "#0A1952", fontWeight: 600 }}
                    >
                      {line.base_price} FCFA
                    </Typography>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} color="#6B7280" />
                    <Typography
                      variant="body2"
                      sx={{ color: "#6B7280", fontSize: "13px" }}
                    >
                      {line.estimated_duration_minutes} min
                    </Typography>
                  </div>
                </div>

                {/* Horaires par jour (max 3 jours affichés) */}
                <div>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#6B7280",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    Horaires disponibles:
                  </Typography>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {Object.entries(line.schedule)
                      .slice(0, 3)
                      .map(([day, times]) => (
                        <Chip
                          key={day}
                          label={`${getDayName(day)}: ${(times as string[]).length}h`}
                          size="small"
                          sx={{
                            fontSize: "0.7rem",
                            height: "22px",
                            backgroundColor: "#E5E7EB",
                            color: "#1E3A8A",
                          }}
                        />
                      ))}
                    {Object.keys(line.schedule).length > 3 && (
                      <Chip
                        label={`+${Object.keys(line.schedule).length - 3}`}
                        size="small"
                        sx={{
                          fontSize: "0.7rem",
                          height: "22px",
                          backgroundColor: "#E5E7EB",
                          color: "#6B7280",
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Description */}
                {line.description && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#9CA3AF",
                      fontSize: "12px",
                      display: "block",
                      mt: 2,
                      fontStyle: "italic",
                    }}
                  >
                    {line.description.length > 60
                      ? `${line.description.substring(0, 60)}...`
                      : line.description}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}