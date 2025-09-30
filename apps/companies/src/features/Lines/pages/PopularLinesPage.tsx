import { useState } from "react";
import { useSetPageMeta } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { Button, Tabs, Tab, Box } from "@mui/material";
import { AddSquare } from "iconsax-react";
import { PopularLines } from "../components";
import { List, TrendingUp } from "lucide-react";

export function PopularLinesPage() {
  useSetPageMeta({
    title: "Lignes Populaires",
  });

  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    if (newValue === 0) {
      navigate("/lines/popular");
    } else {
      navigate("/lines");
    }
  };

  const handleAddLine = () => {
    navigate("/lines/addline");
  };

  return (
    <div className="pt-24 px-10">
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

          <Button
            onClick={handleAddLine}
            className="bg-primary-orange-100 rounded-[10px] h-10 normal-case"
            startIcon={<AddSquare className="w-5 h-5" />}
            variant="contained"
          >
            Ajouter une ligne
          </Button>
        </div>
      </Box>

      {/* Contenu de la page */}
      <div className="mt-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-[#0A1952] mb-2">
            Lignes les plus populaires
          </h2>
          <p className="text-gray-600">
            Découvrez les lignes les plus empruntées par vos clients
          </p>
        </div>

        <PopularLines limit={20} />
      </div>
    </div>
  );
}