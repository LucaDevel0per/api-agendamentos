import { prisma } from "../lib/prisma";
import { isBefore, startOfHour } from "date-fns";


interface IRequest {
    providerId: string; 
    serviceId: number;  
    date: Date;        
    clientId: string;   
}

class CreateAppointmentService {
    public async execute({ providerId, serviceId, date, clientId }: IRequest){

        const appointmentDate = startOfHour(date)
        if (isBefore(appointmentDate, new Date())) {
            throw new Error("Hour Error")
        }

        const existingAppointment = await prisma.appointment.findFirst({
            where: {
                providerId: parseInt(providerId, 10),
                date: appointmentDate,
            }
        })
        if (existingAppointment) {
            throw new Error("Try Other Date.");
        }

        const appointment = await prisma.appointment.create({
            data: {
                providerId: parseInt(providerId, 10),
                serviceId,
                date: appointmentDate,
                clientId: parseInt(clientId, 10),
            }
        });

        return appointment;

    }
}

export default CreateAppointmentService;