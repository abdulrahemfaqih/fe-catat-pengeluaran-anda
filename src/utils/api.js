import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.import.meta.env.VITE_PUBLIC_API_URL || 'http://localhost:5000',
})

export default api;