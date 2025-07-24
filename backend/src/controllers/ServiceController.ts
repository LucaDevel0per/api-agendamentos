import { Request, Response } from "express";
import { z } from 'zod';
import CreateServiceService from "../services/CreateServiceService";

const createServiceBodySchema = z.object({
    name: z.string().min(3),
    price: z.number().positive(),
    durationInMinutes: z.number().int().positive(),

})

class ServiceController {
    public async create(req: Request, res: Response): Promise<Response> {

        const {name, price, durationInMinutes} = createServiceBodySchema.parse(req.body);

        const providerId = req.user.id;
        const createService = new CreateServiceService
        const service = await createService.execute({
            name, 
            price, 
            durationInMinutes, 
            providerId
        })
        return res.status(201).json(service)
    }
}

export default new ServiceController