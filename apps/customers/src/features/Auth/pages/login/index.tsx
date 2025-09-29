import React, { useState } from 'react';
import { Eye, EyeOff, Phone, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate =useNavigate()
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-1 font-bold mb-2">
        <img src="/assets/images/logo-esay-travel.svg" alt="esay-travel" />

        </div>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-bleu-100 mb-2 flex items-center gap-2">
          Bon Retour
          <span className="text-2xl">👋</span>
        </h1>
        <p className="text-secondary-bleu-100">
          Cher voyageur...
        </p>
      </div>
      <div className="space-y-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-secondary-bleu-100 mb-2">
            Numéro de téléphone
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5  text-orange-600" />
            </div>
            <input
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+229 01 XX XX XX XX"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-secondary-bleu-100 mb-2">
            Mot de passe
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Key className="h-5 w-5  text-orange-600" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Au moins 8 caractères"
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
        </div>
        <div className="text-right">
          <button
            onClick={() => console.log('Mot de passe oublié')}
            className="text-sm text-orange-500 hover:text-orange-600 font-medium"
          >
            Mot de passe oublié ?
          </button>
        </div>
        <button
          onClick={()=> navigate('/')}
          className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 outline-none"
        >
          Se connecter
        </button>
        
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-800">
          Vous n'avez pas de compte ?{' '}
          <a
            href="#"
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            Inscrivez-vous
          </a>
        </p>
      </div>
    </div>
  );
}
