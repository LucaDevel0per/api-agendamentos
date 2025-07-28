import { prisma } from "../lib/prisma";
import { Category } from '@prisma/client';

interface IRequest {
    category?: Category;
}

class ListProvidersService {
    public async execute({ category }: IRequest){

        const whereClause: any = {
            role: 'PROVIDER'
        };

        if (category) {
            whereClause.category = category;
        };

        
        const providers = await prisma.user.findMany({
            where: whereClause,
            select: {
                id: true,
                name: true,
                email: true,
                category: true,
            }
        })
        return providers
    }
}

export default ListProvidersService