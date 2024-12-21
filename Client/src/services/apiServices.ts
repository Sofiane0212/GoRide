/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

const URL = import.meta.env.VITE_API_URL
// Create an instance of axios with the backend base URL
const apiClient = axios.create({
  //baseURL: 'http://localhost:3000/',
  baseURL: `${URL}:3000/`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`
  }
})

// ajouter un intercepteur de requetes
// pour que AXIOS ajout le token au requetes, parsque AXIOS peut etre cree avant que le USER ne se connecte
// et donc AXIOS n'a pas de token avant la connexion, et les requetes ne reussissent pas
apiClient.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default {
  get(route: string, config = {}) {
    return apiClient.get(route, config)
  },
  post(route: string, data: any, config = {}) {
    return apiClient.post(route, data, config)
  },
  put(route: string, data: any, config = {}) {
    return apiClient.put(route, data, config)
  },
  delete(route: string, config = {}) {
    return apiClient.delete(route, config)
  }
}
