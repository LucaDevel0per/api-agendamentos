import { Request, Response } from 'express';
import { z } from 'zod';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ListUserAppointmentsService from '../services/ListUserAppointmentsService';
import CancellAppointmentsService from '../services/CancelAppointmentService';

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

    public async delete(req: Request, res: Response) {
        const { id: userId} = req.user;
        const {appointmentId} = req.params;

        const cancelAppointment = new CancellAppointmentsService();

        const cancel = await cancelAppointment.execute({
            appointmentId: appointmentId,
            userId: userId
        })

        return res.status(204).send()
    }
}

export default new AppointmentController();