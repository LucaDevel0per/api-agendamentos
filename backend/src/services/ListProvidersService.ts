import { prisma } from "../lib/prisma";

class ListProvidersService {
    public async execute(){
        const providers = await prisma.user.findMany({
            where: {
                role: 'PROVIDER'
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })
        return providers
    }
}

export default ListProvidersService