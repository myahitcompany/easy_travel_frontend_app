import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Phone, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  motDePasse: string;
  confirmMotDePasse: string;
}

interface FormErrors {
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  motDePasse?: string;
  confirmMotDePasse?: string;
}

export function Register() {
  const navigate= useNavigate()
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    motDePasse: '',
    confirmMotDePasse: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }

    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Le numéro de téléphone est requis';
    }

    if (!formData.motDePasse) {
      newErrors.motDePasse = 'Le mot de passe est requis';
    } else if (formData.motDePasse.length < 8) {
      newErrors.motDePasse = 'Le mot de passe doit contenir au moins 8 caractères';
    }

    if (!formData.confirmMotDePasse) {
      newErrors.confirmMotDePasse = 'Veuillez confirmer votre mot de passe';
    } else if (formData.motDePasse !== formData.confirmMotDePasse) {
      newErrors.confirmMotDePasse = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1 font-bold mb-2">
            <img src="/assets/images/logo-esay-travel.svg" alt="esay-travel" />
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-secondary-bleu-100 mb-2 flex items-center gap-2">
            Bienvenue
            <span className="text-2xl">👋</span>
          </h1>
          <p className="text-secondary-bleu-100">
            Créez votre compte pour commencer votre voyage...
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Nom et Prénom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-secondary-bleu-100 mb-2">
                Nom
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-orange-600" />
                </div>
                <input
                  id="nom"
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  placeholder="DOE"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors ${
                    errors.nom ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.nom && (
                <p className="mt-1 text-sm text-red-600">{errors.nom}</p>
              )}
            </div>

            <div>
              <label htmlFor="prenom" className="block text-sm font-medium text-secondary-bleu-100 mb-2">
                Prénom
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-orange-600" />
                </div>
                <input
                  id="prenom"
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  placeholder="John"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors ${
                    errors.prenom ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.prenom && (
                <p className="mt-1 text-sm text-red-600">{errors.prenom}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-secondary-bleu-100 mb-2">
              Adresse mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-orange-600" />
              </div>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john.doe@gmail.com"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Téléphone */}
          <div>
            <label htmlFor="telephone" className="block text-sm font-medium text-secondary-bleu-100 mb-2">
              Numéro de téléphone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-orange-600" />
              </div>
              <input
                id="telephone"
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleInputChange}
                placeholder="+229 01 XX XX XX XX"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors ${
                  errors.telephone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.telephone && (
              <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>
            )}
          </div>

          {/* Mot de passe */}
          <div>
            <label htmlFor="motDePasse" className="block text-sm font-medium text-secondary-bleu-100 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-orange-600" />
              </div>
              <input
                id="motDePasse"
                type={showPassword ? 'text' : 'password'}
                name="motDePasse"
                value={formData.motDePasse}
                onChange={handleInputChange}
                placeholder="Au moins 8 caractères"
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors ${
                  errors.motDePasse ? 'border-red-500' : 'border-gray-300'
                }`}
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
            {errors.motDePasse && (
              <p className="mt-1 text-sm text-red-600">{errors.motDePasse}</p>
            )}
          </div>

          {/* Confirmer mot de passe */}
          <div>
            <label htmlFor="confirmMotDePasse" className="block text-sm font-medium text-secondary-bleu-100 mb-2">
              Confirmer mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-orange-600" />
              </div>
              <input
                id="confirmMotDePasse"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmMotDePasse"
                value={formData.confirmMotDePasse}
                onChange={handleInputChange}
                placeholder="Au moins 8 caractères"
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors ${
                  errors.confirmMotDePasse ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {errors.confirmMotDePasse && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmMotDePasse}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="button"
              onClick={()=> navigate('/')}
              className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 outline-none"
          >
            S'inscrire
          </button>
        </div>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-800">
            Vous avez déjà un compte ?{' '}
            <a
              href="#"
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              Connectez-vous
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}