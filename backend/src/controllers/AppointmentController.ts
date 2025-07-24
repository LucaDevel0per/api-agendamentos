import { Request, Response } from 'express';
import { z } from 'zod';
import CreateAppointmentService from '../services/CreateAppointmentService';

const createAppointmentBodySchema = z.object({
    providerId: z.string(),
    serviceId: z.number().int(),
    date: z.coerce.date(), 
});

class AppointmentController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { providerId, serviceId, date } = createAppointmentBodySchema.parse(req.body);

        const clientId = req.user.id;

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
            providerId,
            serviceId,
            date,
            clientId,
        });

        return res.status(201).json(appointment);
    }
}

export default new AppointmentController();