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
    public async execute({providerId, year, month, day}: IRequest): Promise <IAvailability[]> {

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
        });

        const bookedHours = appointmentsInDay.map(appointment => getHours(appointment.date));

        const workHours = Array.from({ length: 10 }, (_, index) => index + 8); 

        const currentDate = new Date();

        const availability = workHours.map(hour => {
            const hasAppointmentInHour = bookedHours.includes(hour);
            const compareDate = new Date(year, month - 1, day, hour);

            const isAvailable = !hasAppointmentInHour && isAfter(compareDate, currentDate);

            return {
                hour,
                available: isAvailable,
            };
        });

        return availability;
    }
}

export default ListProviderAvailabilityService;