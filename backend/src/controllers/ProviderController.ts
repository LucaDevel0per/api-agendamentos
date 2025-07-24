import { Request, Response } from "express";
import { z } from 'zod';
import ListProvidersService from "../services/ListProvidersService";
import ListProviderAvailabilityService from "../services/ListProviderAvailabilityService";

const getAvailabilityQuerySchema = z.object({
    year: z.coerce.number().int(), // z.coerce tenta converter a string para número
    month: z.coerce.number().int(),
    day: z.coerce.number().int(),
});

class ProviderController {
    public async list(req: Request, res: Response): Promise<Response> {
        const listProviders = new ListProvidersService();
        const providers = await listProviders.execute()
        return res.status(200).json(providers)
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