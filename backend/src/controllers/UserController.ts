import { Request, Response } from "express";
import { z } from 'zod';
import CreateUserService from "../services/CreateUserService";
import { Role } from "../../generated/prisma";


const createUserBodySchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(6),
    role: z.enum([Role.USER, Role.PROVIDER, Role.ADMIN]).optional()
})

class UserController {
    public async create(req: Request, res: Response): Promise<Response> {

        const { name, email, password, role } = createUserBodySchema.parse(req.body);
        const createUser = new CreateUserService
        const user = await createUser.execute({ name, email, password, role })

        return res.status(201).json(user);
    }
}

export default new UserController();