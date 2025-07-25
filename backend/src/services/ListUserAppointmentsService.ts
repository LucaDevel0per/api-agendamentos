import { prisma } from "../lib/prisma";

interface IReq {
    userId: string
}

class ListUserAppointmentsService {
    public async execute({ userId}: IReq) {

        const appointments = await prisma.appointment.findMany({
            where: {
                clientId: parseInt(userId, 10),
            },
            include: {
                provider: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                service: true
                },
                orderBy: {
                    date: 'desc',
                }
            });
            return appointments;
        }
}

export default ListUserAppointmentsService;