import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { TextField, InputAdornment, Button } from "@mui/material";
import { Routing, SearchNormal } from "iconsax-react";
import { DatePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";

export function Search() {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());
  const navigate = useNavigate()
  return (
    <div className="flex flex-col">
      <div className="flex md:flex-row flex-col md:space-x-6 space-y-6 md:space-y-0  w-full">
        <TextField
          label="Lieu de départ"
          variant="outlined"
          placeholder="Ex:cotonou"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              fontFamily: "Chakra Petch",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Routing width={20} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Lieu de d’arrivée"
          variant="outlined"
          placeholder="Ex:Parakou"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              fontFamily: "Chakra Petch",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Routing width={20} />
              </InputAdornment>
            ),
          }}
        />

        <DatePicker
          label="Sélectionner une date"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              fontFamily: "Chakra Petch",
            },
          }}
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
        />

        <TextField
          label="Nombre de passager"
          variant="outlined"
          placeholder="Ex: 2"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              fontFamily: "Chakra Petch",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Routing width={20} />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="flex md:justify-end mt-4 pb-8">
        <Button
          onClick={()=> navigate('/travels-availables')}
          className="bg-primary-orange-100 rounded-[10px] h-12 normal-case md:w-auto w-full"
          startIcon={<SearchNormal className="w-5 h-5" />}
          variant="contained"
        >
          Rechercher
        </Button>
      </div>
    </div>
  );
}
