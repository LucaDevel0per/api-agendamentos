import { Request, Response } from "express";
import { z } from 'zod';
import ListProvidersService from "../services/ListProvidersService";
import ListProviderAvailabilityService from "../services/ListProviderAvailabilityService";
import { Category } from "@prisma/client";

const getAvailabilityQuerySchema = z.object({
    year: z.coerce.number().int(), // z.coerce tenta converter a string para número
    month: z.coerce.number().int(),
    day: z.coerce.number().int(),
});

const listProvidersQuerySchema = z.object({
    category: z.enum([
        Category.BARBEIRO,
        Category.CABELEIREIRO,
        Category.MANICURE,
        Category.TATUADOR
    ]).optional()
});

class ProviderController {
    public async list(req: Request, res: Response): Promise<Response> {

        const { category } = listProvidersQuerySchema.parse(req.query);

        const listProviders = new ListProvidersService();
        const providers = await listProviders.execute({ category })

        return res.status(200).json(providers);
    }



    public async availability(req: Request, res: Response): Promise<Response> 
    {

        const { providerId} = req.params;
        const { year, month, day} = getAvailabilityQuerySchema.parse(req.query);

        const listProviderAvailability = new ListProviderAvailabilityService()
        
        const availabilitys = await listProviderAvailability.execute({
            providerId,
            year,
            month,
            day
        })


        return res.status(200).json(availabilitys)
    }
}

export default new ProviderController;