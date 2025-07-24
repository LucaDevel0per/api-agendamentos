import { prisma } from '../lib/prisma'

interface IRequest {
    name: string;
    price: number;
    durationInMinutes: number;
    providerId: string;
}

class CreateServiceService {
    public async execute({ name, price, durationInMinutes, providerId }: IRequest) {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(providerId, 10)}
        })

        if (!user || user.role !== 'PROVIDER') {
            throw new Error("Permission denied.")
        }

        const service = await prisma.service.create({
            data: {
                name,
                price,
                durationInMinutes,
                providerId: parseInt(providerId, 10),
            }, 
            select: {
                id: true,
                name: true,
                price: true,
                durationInMinutes: true,
                providerId: true
            }
        })

        return service
    }
}

export default CreateServiceService;