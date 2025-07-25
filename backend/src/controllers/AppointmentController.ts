import { Request, Response } from 'express';
import { z } from 'zod';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ListUserAppointmentsService from '../services/ListUserAppointmentsService';

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


    public async list(req: Request, res: Response): Promise<Response> {
        const clientId = req.user.id;
        const listUserAppointments =  new ListUserAppointmentsService();

        const appointments = await listUserAppointments.execute({
            userId: clientId
        })

        return res.json(appointments)
        

    }
}

export default new AppointmentController();