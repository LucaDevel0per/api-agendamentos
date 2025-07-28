import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3333'
}) 

export async function getProviders(category?: string | null) {

    let url = '/providers';

    if (category) {
        url += `?category=${category}`;
    }

    const response = await api.get(url);
    return response.data;
}

interface CreateAppointmentData {
    providerId: string;
    serviceId: number; // Por enquanto, vamos usar um ID fixo
    date: Date;
}

export async function createAppointment({ providerId, serviceId, date }: CreateAppointmentData) {
    const response = await api.post('/appointments', {
        providerId,
        serviceId,
        date,
    });
    return response.data;
}