import { prisma } from "../lib/prisma";

interface IRequest {
    appointmentId: string
    userId: string
}

class CancellAppointmentsService {
    public async execute({ appointmentId, userId}: IRequest) {

        const result = await prisma.appointment.deleteMany({
            where: {
                id: parseInt(appointmentId, 10),
                clientId: parseInt(userId, 10)
            }
        })

        if ( result.count === 0) {
            throw new Error("Nothing to cancel.")
        }
    }
}

export default CancellAppointmentsService;