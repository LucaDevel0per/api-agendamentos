import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3333'
}) 

export async function getProviders() {
    const response = await api.get('/providers');
    return response.data
}