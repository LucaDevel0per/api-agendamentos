import { Request, Response } from "express";
import { z } from 'zod';
import CreateSessionService from "../services/CreateSessionService";
// import { Role } from "../../generated/prisma";

const createSessionBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
})

class SessionController {
    public async create(req: Request, res: Response): Promise <Response> {

        const { email, password } = createSessionBodySchema.parse(req.body)
        const createSession = new CreateSessionService();

        const { user, token } = await createSession.execute({
            email,
            password
        })

        return res.json({ user, token })
    }
}

export default new SessionController();