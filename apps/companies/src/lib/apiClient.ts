import axios from "axios";
import { appConfig } from "@/configs";
import { PersistentStorage, StorageKeys } from "@/utils";

// Crée une instance d'axios avec la configuration de base
const apiClient = axios.create({
  baseURL: appConfig.ESAY_TRAVEL_API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Fonction pour définir ou supprimer le token d'autorisation
export const setAuthToken = (token: string) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `JWT ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

// Initialisation de l'API client en récupérant le token stocké
export const initializeApiClient = () => {
  const token = PersistentStorage.getData(StorageKeys.ESAY_TOKEN_KEY, false);
  if (token) {
    // Enlever les guillemets si présents (causés par JSON.stringify)
    const cleanToken = token.replace(/^"(.*)"$/, "$1");
    setAuthToken(cleanToken);
  }
};

// Vérification de l'expiration du token dans l'intercepteur de réponse
apiClient.interceptors.response.use(
  (response) => response, // Si la réponse est OK, on la retourne
  (error) => {
    // Vérifier si l'erreur est une erreur 401 (Non autorisé)
    if (error.response && error.response.status === 401) {
      // Supprimer le token expiré du stockage
      PersistentStorage.clear();
      // Rediriger l'utilisateur vers la page de login
      window.location.href = "/auth/login";
    }
    return Promise.reject(error); // Propager l'erreur si ce n'est pas une 401
  }
);

// Initialiser l'API client avec le token
initializeApiClient();

export default apiClient;
