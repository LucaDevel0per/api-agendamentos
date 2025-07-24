import { prisma } from "../lib/prisma";
import { getHours, isAfter } from 'date-fns';

interface IRequest {
    providerId: string;
    day: number;
    month: number;
    year: number;
}

interface IAvailability {
    hour: number;
    available: boolean;
}


class ListProviderAvailabilityService {
    public async execute({providerId, year, month, day}: IRequest) {

        // console.log('DADOS RECEBIDOS NO SERVIÇO:', { providerId, year, month, day });

        const appointmentsInDay = await prisma.appointment.findMany({
            where: {
                providerId: parseInt(providerId, 10),
                date: {
                    // Maior ou igual ao início do dia (00:00:00)
                    gte: new Date(year, month -1, day, 0, 0, 0),
                    // Menor que o final do dia (23:59:59)
                    lt: new Date(year, month - 1, day, 23, 59 , 59)
                }
            }
        })
        return appointmentsInDay;
    }
}

export default ListProviderAvailabilityService;