import React, { useState, useEffect } from 'react';
import { Route, Clock, Calendar, DollarSign, X } from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';
import { linesApi } from '../services';
import { UpdateLinePayload, LineSchedule, Line } from '../types';
import { Alert, CircularProgress } from '@mui/material';

interface DaySchedule {
  day: string;
  times: string[];
}

export default function UpdateLinePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState({
    name: '',
    origin_city: '',
    destination_city: '',
    base_price: '',
    distance_km: '',
    estimated_duration_minutes: '',
    child_discount_percentage: '',
    child_age_limit: '',
    luggage_weight_limit_kg: '',
    extra_luggage_price_per_kg: '',
    description: '',
  });

  const [intermediateStops, setIntermediateStops] = useState<string[]>([]);
  const [currentStop, setCurrentStop] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [schedules, setSchedules] = useState<DaySchedule[]>([]);
  const [selectedDay, setSelectedDay] = useState('1');
  const [selectedTime, setSelectedTime] = useState('06:00');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const days = [
    { value: '1', label: 'Lundi' },
    { value: '2', label: 'Mardi' },
    { value: '3', label: 'Mercredi' },
    { value: '4', label: 'Jeudi' },
    { value: '5', label: 'Vendredi' },
    { value: '6', label: 'Samedi' },
    { value: '7', label: 'Dimanche' },
  ];

  const times = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

  useEffect(() => {
    const fetchLineData = async () => {
      if (!id) {
        setError('ID de ligne manquant');
        setLoadingData(false);
        return;
      }

      try {
        const response = await linesApi.getLineById(id);
        const line: Line = response.data.line;

        setFormData({
          name: line.name,
          origin_city: line.origin_city,
          destination_city: line.destination_city,
          base_price: line.base_price.toString(),
          distance_km: line.distance_km.toString(),
          estimated_duration_minutes: line.estimated_duration_minutes.toString(),
          child_discount_percentage: line.child_discount_percentage?.toString() || '',
          child_age_limit: line.child_age_limit?.toString() || '',
          luggage_weight_limit_kg: line.luggage_weight_limit_kg?.toString() || '',
          extra_luggage_price_per_kg: line.extra_luggage_price_per_kg?.toString() || '',
          description: line.description || '',
        });

        setIntermediateStops(line.intermediate_stops || []);
        setIsActive(line.is_active === '1');

        // Convertir le schedule en DaySchedule[]
        const schedulesArray: DaySchedule[] = [];
        Object.entries(line.schedule).forEach(([day, times]) => {
          if (times && Array.isArray(times) && times.length > 0) {
            schedulesArray.push({ day, times });
          }
        });
        setSchedules(schedulesArray);

        setLoadingData(false);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erreur lors du chargement de la ligne');
        setLoadingData(false);
      }
    };

    fetchLineData();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addIntermediateStop = () => {
    if (currentStop.trim() && !intermediateStops.includes(currentStop.trim())) {
      setIntermediateStops([...intermediateStops, currentStop.trim()]);
      setCurrentStop('');
    }
  };

  const removeIntermediateStop = (stop: string) => {
    setIntermediateStops(intermediateStops.filter(s => s !== stop));
  };

  const addSchedule = () => {
    const existingSchedule = schedules.find(s => s.day === selectedDay);

    if (existingSchedule) {
      if (!existingSchedule.times.includes(selectedTime)) {
        setSchedules(schedules.map(s =>
          s.day === selectedDay
            ? { ...s, times: [...s.times, selectedTime].sort() }
            : s
        ));
      }
    } else {
      setSchedules([...schedules, { day: selectedDay, times: [selectedTime] }]);
    }
  };

  const removeScheduleTime = (day: string, time: string) => {
    setSchedules(schedules.map(s => {
      if (s.day === day) {
        const newTimes = s.times.filter(t => t !== time);
        return newTimes.length > 0 ? { ...s, times: newTimes } : null;
      }
      return s;
    }).filter(Boolean) as DaySchedule[]);
  };

  const handleSubmit = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      // Validation
      if (!formData.name || !formData.origin_city || !formData.destination_city || !formData.base_price || !formData.distance_km || !formData.estimated_duration_minutes) {
        setError('Veuillez remplir tous les champs obligatoires');
        return;
      }

      if (schedules.length === 0) {
        setError('Veuillez ajouter au moins un horaire');
        return;
      }

      // Construire le schedule au format attendu par l'API
      const schedule: LineSchedule = {};
      schedules.forEach(s => {
        schedule[s.day as keyof LineSchedule] = s.times;
      });

      const payload: UpdateLinePayload = {
        name: formData.name,
        origin_city: formData.origin_city,
        destination_city: formData.destination_city,
        base_price: parseFloat(formData.base_price),
        distance_km: parseFloat(formData.distance_km),
        estimated_duration_minutes: parseInt(formData.estimated_duration_minutes),
        child_discount_percentage: formData.child_discount_percentage ? parseFloat(formData.child_discount_percentage) : undefined,
        child_age_limit: formData.child_age_limit ? parseInt(formData.child_age_limit) : undefined,
        luggage_weight_limit_kg: formData.luggage_weight_limit_kg ? parseFloat(formData.luggage_weight_limit_kg) : undefined,
        extra_luggage_price_per_kg: formData.extra_luggage_price_per_kg ? parseFloat(formData.extra_luggage_price_per_kg) : undefined,
        is_active: isActive ? 1 : 0,
        schedule,
        intermediate_stops: intermediateStops,
        description: formData.description,
      };

      await linesApi.updateLine(id, payload);
      setSuccess(true);

      setTimeout(() => {
        navigate('/lines');
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour de la ligne');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate('/lines');
  };

  const getDayLabel = (dayValue: string) => {
    return days.find(d => d.value === dayValue)?.label || '';
  };

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[800px] bg-white border-2 border-white rounded-[10px] shadow-2xl">
        <div className="text-[#0A1952] text-[32px] leading-[41.8px] pl-[41px] pt-[27px] pb-[25px] font-bold">
          Mettre à jour une ligne
        </div>

        {error && (
          <div className="px-[41px] mb-4">
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          </div>
        )}

        {success && (
          <div className="px-[41px] mb-4">
            <Alert severity="success">
              Ligne mise à jour avec succès!
            </Alert>
          </div>
        )}

        {/* Nom de la ligne */}
        <div className="px-[41px] mb-[20px]">
          <div className="mb-[5px] text-[14px] text-[#0A195299] leading-[20.8px]">
            Nom de la ligne *
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ex: Cotonou-Parakou Express"
            className="w-full h-[40px] rounded-[10px] border text-[14px] px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Departure and Destination Cities */}
        <div className="flex flex-col sm:flex-row gap-[29px] px-[41px] mb-[20px]">
          <div className="flex-1">
            <div className="mb-[5px] text-[14px] text-[#0A195299] leading-[20.8px]">
              Ville de départ *
            </div>
            <div className="relative">
              <input
                type="text"
                name="origin_city"
                value={formData.origin_city}
                onChange={handleInputChange}
                placeholder="Saisir la ville de départ"
                className="bg-white w-full h-[40px] rounded-[10px] border text-[14px] pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Route
                size={16}
                color={formData.origin_city ? "#0A1952" : "#0A195299"}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-[5px] text-[14px] text-[#0A195299] leading-[20.8px]">
              Ville de destination *
            </div>
            <div className="relative">
              <input
                type="text"
                name="destination_city"
                value={formData.destination_city}
                onChange={handleInputChange}
                placeholder="Saisir la ville de destination"
                className="bg-white w-full h-[40px] rounded-[10px] border text-[14px] pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Route
                size={16}
                color={formData.destination_city ? "#0A1952" : "#0A195299"}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Points d'arrêt intermédiaires */}
        <div className="px-[41px] mb-[20px]">
          <div className="mb-[5px] text-[14px] text-[#0A195299] leading-[20.8px]">
            Points d'arrêt intermédiaires
          </div>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={currentStop}
              onChange={(e) => setCurrentStop(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addIntermediateStop()}
              placeholder="Ajouter un point d'arrêt"
              className="flex-1 h-[40px] rounded-[10px] border text-[14px] px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addIntermediateStop}
              className="w-[40px] h-[40px] rounded-[10px] border border-[#0A195230] text-[#0A1952] text-[18px] font-bold hover:bg-[#0A195210] focus:outline-none"
            >
              +
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {intermediateStops.map((stop, index) => (
              <div key={index} className="flex items-center gap-1 bg-gray-200 rounded-lg px-3 py-1">
                <span className="text-sm">{stop}</span>
                <X
                  size={16}
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => removeIntermediateStop(stop)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Prix et Distance */}
        <div className="flex flex-col sm:flex-row gap-[29px] px-[41px] mb-[20px]">
          <div className="flex-1">
            <div className="mb-[5px] text-[14px] text-[#0A195299] leading-[20.8px]">
              Prix de base (FCFA) *
            </div>
            <div className="relative">
              <input
                type="number"
                name="base_price"
                value={formData.base_price}
                onChange={handleInputChange}
                className="w-full h-[40px] rounded-[10px] border text-[14px] pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <DollarSign size={16} color="#0A195299" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-[5px] text-[14px] text-[#0A195299] leading-[20.8px]">
              Distance (km) *
            </div>
            <input
              type="number"
              name="distance_km"
              value={formData.distance_km}
              onChange={handleInputChange}
              className="w-full h-[40px] rounded-[10px] border text-[14px] px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Durée estimée */}
        <div className="px-[41px] mb-[20px]">
          <div className="mb-[5px] text-[14px] text-[#0A195299] leading-[20.8px]">
            Durée estimée (minutes) *
          </div>
          <div className="relative">
            <input
              type="number"
              name="estimated_duration_minutes"
              value={formData.estimated_duration_minutes}
              onChange={handleInputChange}
              className="w-full h-[40px] rounded-[10px] border text-[14px] pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Clock size={16} color="#0A1952" className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Options enfants et bagages */}
        <div className="flex flex-col sm:flex-row gap-[29px] px-[41px] mb-[20px]">
          <div className="flex-1">
            <div className="mb-[5px] text-[14px] text-[#0A195299] leading-[20.8px]">
              Réduction enfant (%)
            </div>
            <input
              type="number"
              name="child_discount_percentage"
              value={formData.child_discount_percentage}
              onChange={handleInputChange}
              className="w-full h-[40px] rounded-[10px] border text-[14px] px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1">
            <div className="mb-[5px] text-[14px] text-[#0A195299] leading-[20.8px]">
              Âge limite enfant
            </div>
            <input
              type="number"
              name="child_age_limit"
              value={formData.child_age_limit}
              onChange={handleInputChange}
              className="w-full h-[40px] rounded-[10px] border text-[14px] px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-[29px] px-[41px] mb-[20px]">
          <div className="flex-1">
            <div className="mb-[5px] text-[14px] text-[#0A195299] leading-[20.8px]">
              Limite bagages (kg)
            </div>
            <input
              type="number"
              name="luggage_weight_limit_kg"
              value={formData.luggage_weight_limit_kg}
              onChange={handleInputChange}
              className="w-full h-[40px] rounded-[10px] border text-[14px] px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1">
            <div className="mb-[5px] text-[14px] text-[#0A195299] leading-[20.8px]">
              Prix bagage extra (FCFA/kg)
            </div>
            <input
              type="number"
              name="extra_luggage_price_per_kg"
              value={formData.extra_luggage_price_per_kg}
              onChange={handleInputChange}
              className="w-full h-[40px] rounded-[10px] border text-[14px] px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Statut */}
        <div className="px-[41px] mb-[20px]">
          <div className="mb-[8px] text-[14px] text-[#0A195299] leading-[20.8px]">
            Statut de la ligne
          </div>
          <div className="flex items-center gap-1">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A1952]"></div>
            </label>
            <span className={`text-[14px] ${isActive ? 'text-[#0A1952]' : 'text-[#0A195299]'}`}>
              {isActive ? "Actif" : "Non actif"}
            </span>
          </div>
        </div>

        {/* Jours & Horaires */}
        <div className="px-[41px] mb-[20px]">
          <div className="mb-[5px] text-[14px] text-[#0A195299] leading-[20.8px]">
            Jours & Heure[s] de départ *
          </div>
          <div className="flex flex-col sm:flex-row gap-[10px] mb-3">
            <div className="relative flex-1">
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="bg-white w-full h-[40px] rounded-[10px] border text-[14px] pl-10 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {days.map((day) => (
                  <option key={day.value} value={day.value}>{day.label}</option>
                ))}
              </select>
              <Calendar size={16} color="#0A1952" className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative flex-1">
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="bg-white w-full h-[40px] rounded-[10px] border text-[14px] pl-10 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {times.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              <Clock size={16} color="#0A1952" className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              onClick={addSchedule}
              className="w-full sm:w-[40px] h-[40px] rounded-[10px] border border-[#0A195230] text-[#0A1952] text-[18px] font-bold hover:bg-[#0A195210] focus:outline-none"
            >
              +
            </button>
          </div>

          {/* Afficher les horaires ajoutés */}
          <div className="space-y-2">
            {schedules.map((schedule) => (
              <div key={schedule.day} className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium text-sm text-[#0A1952] mb-2">{getDayLabel(schedule.day)}</div>
                <div className="flex flex-wrap gap-2">
                  {schedule.times.map((time) => (
                    <div key={time} className="flex items-center gap-1 bg-white border rounded-lg px-3 py-1">
                      <span className="text-sm">{time}</span>
                      <X
                        size={14}
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => removeScheduleTime(schedule.day, time)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="px-[41px] mb-[35px]">
          <div className="mb-[5px] text-[14px] text-[#0A195299] leading-[20.8px]">
            Description
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description de la ligne..."
            rows={3}
            className="w-full rounded-[10px] border text-[14px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row w-full px-[41px] pb-[39px] gap-[29px]">
          <button
            onClick={handleClose}
            disabled={loading}
            className="flex-1 h-[44px] rounded-[10px] border border-[#D63A00] text-[#D63A00] text-[16px] font-medium hover:bg-transparent focus:outline-none disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 h-[44px] rounded-[10px] bg-[#D63A00] text-white text-[16px] font-medium hover:bg-[#B8310A] focus:outline-none disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Mettre à jour'}
          </button>
        </div>
      </div>
    </div>
  );
}