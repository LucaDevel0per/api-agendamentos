import { prisma } from "../lib/prisma";

interface IRequest {
    userId: string
}

class ShowProfileService {
    public async execute({ userId }: IRequest) {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId, 10) },
            select: { 
                id: true, 
                name: true, 
                email: true, 
                role: true 
            }
        });

        if (!user) {
            throw new Error("User not found.");
        }

        return user;
    }
}

export default ShowProfileService