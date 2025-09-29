import React, { useState } from 'react';
import { Route, Clock, Calendar, DollarSign } from "lucide-react";

export default function UpdateLinePage() {
  const [departureCity, setDepartureCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [normalPrice, setNormalPrice] = useState('1500 FCFA');
  const [promoPrice, setPromoPrice] = useState('1200 FCFA');
  const [boardingCity, setBoardingCity] = useState('');
  const [duration, setDuration] = useState('01:00');
  const [isActive, setIsActive] = useState(true);
  const [selectedDay, setSelectedDay] = useState('Lundi');
  const [selectedTime, setSelectedTime] = useState('10:00');

  const cities = ['Cotonou', 'Porto-Novo', 'Parakou', 'Abomey', 'Bohicon'];
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const times = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

  const handleCloseUpdateModal = () => {
    // Reset form or navigation logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[610px] bg-white border-2 border-white rounded-[10px] shadow-2xl">
        <div className="text-[#0A1952] text-[32px] leading-[41.8px] pl-[41px] pt-[27px] pb-[25px] font-bold">
          Mettre à jour une ligne
        </div>
    
        {/* Departure and Destination Cities */}
        <div className="flex flex-col sm:flex-row gap-[29px] px-[41px] mb-[20px]">
          <div className="flex-1">
            <div className="mb-[5px] text-[14px] text-[#0A195299] leading-[20.8px]">
              Ville de départ
            </div>
            <div className="relative">
              <select
                value={departureCity}
                onChange={(e) => setDepartureCity(e.target.value)}
                className="bg-white w-full h-[40px] rounded-[10px] border border-gray-300 text-[14px] pl-10 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner la ville de départ</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <Route 
                size={16} 
                color={departureCity ? "#0A1952" : "#0A195299"} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" 
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-[5px] text-[14px] text-[#0A195299] leading-[20.8px]">
              Ville de destination
            </div>
            <div className="relative">
              <select
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
                className="bg-white w-full h-[40px] rounded-[10px] border border-gray-300 text-[14px] pl-10 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner la ville de destination</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <Route 
                size={16} 
                color={destinationCity ? "#0A1952" : "#0A195299"} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" 
              />
            </div>
          </div>
        </div>

        {/* Normal Price and Promo Price */}
        <div className="flex flex-col sm:flex-row gap-[29px] px-[41px] mb-[20px]">
          <div className="flex-1">
            <div className="mb-[5px] text-[14px] text-[#0A195299] leading-[20.8px]">
              Prix Normal
            </div>
            <div className="relative">
              <input
                type="text"
                value={normalPrice}
                onChange={(e) => setNormalPrice(e.target.value)}
                className="w-full h-[40px] rounded-[10px] border border-gray-300 text-[14px] pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <DollarSign size={16} color="#0A195299" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-[5px] text-[14px] text-[#0A195299] leading-[20.8px]">
              Prix Promo
            </div>
            <div className="relative">
              <input
                type="text"
                value={promoPrice}
                onChange={(e) => setPromoPrice(e.target.value)}
                className="w-full h-[40px] rounded-[10px] border border-gray-300 text-[14px] pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <DollarSign size={16} color="#0A195299" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Boarding City, Duration, and Status */}
        <div className="flex flex-col lg:flex-row gap-[29px] px-[41px] mb-[20px] lg:items-end">
          <div className="flex-1">
            <div className="mb-[5px] text-[14px] text-[#0A195299] leading-[20.8px]">
              Ville d'embarquement
            </div>
            <div className="relative">
              <select
                value={boardingCity}
                onChange={(e) => setBoardingCity(e.target.value)}
                className="bg-white w-full h-[40px] rounded-[10px] border border-gray-300 text-[14px] pl-10 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner la ville d'embarquement</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <Route 
                size={16} 
                color={boardingCity ? "#0A1952" : "#0A195299"} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" 
              />
            </div>
          </div>

          <div className="lg:flex-[0.7]">
            <div className="mb-[5px] text-[14px] text-[#0A195299] leading-[20.8px]">
              Durée du trajet
            </div>
            <div className="relative">
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="bg-white w-full h-[40px] rounded-[10px] border border-gray-300 text-[14px] pl-10 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="00:30">00:30</option>
                <option value="01:00">01:00</option>
                <option value="01:30">01:30</option>
                <option value="02:00">02:00</option>
                <option value="02:30">02:30</option>
                <option value="03:00">03:00</option>
              </select>
              <Clock size={16} color="#0A1952" className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="lg:flex-[0.8] flex flex-col">
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
        </div>

        {/* Days and Time Selection */}
        <div className="flex gap-[29px] px-[41px] mb-[35px] lg:items-end">
          <div className="flex-1">
            <div className="mb-[5px] text-[14px] text-[#0A195299] leading-[20.8px]">
              Jours & Heure[s] de départ
            </div>
            <div className="flex flex-col sm:flex-row gap-[10px]">
              <div className="relative flex-1">
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="bg-white w-full h-[40px] rounded-[10px] border border-gray-300 text-[14px] pl-10 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {days.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <Calendar size={16} color="#0A1952" className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
              
              <div className="relative flex-1">
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="bg-white w-full h-[40px] rounded-[10px] border border-gray-300 text-[14px] pl-10 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {times.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <Clock size={16} color="#0A1952" className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
              
              <button className="w-full sm:w-[40px] h-[40px] rounded-[10px] border border-[#0A195230] text-[#0A1952] text-[18px] font-bold hover:bg-[#0A195210] focus:outline-none">
                +
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row w-full px-[41px] pb-[39px] gap-[29px]">
          <button
            onClick={handleCloseUpdateModal}
            className="flex-1 h-[44px] rounded-[10px] border border-[#D63A00] text-[#D63A00] text-[16px] font-medium hover:bg-transparent focus:outline-none"
          >
            Annuler
          </button>
          <button className="flex-1 h-[44px] rounded-[10px] bg-[#D63A00] text-white text-[16px] font-medium hover:bg-[#B8310A] focus:outline-none">
            Mettre à jour
          </button>
        </div>
      </div>
    </div>
  );
}