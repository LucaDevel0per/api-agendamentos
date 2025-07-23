import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";

class UserController {
    public async create(req: Request, res: Response): Promise<Response> {
        const createUser = new CreateUserService
        const { name, email, password } = req.body
        const user = await createUser.execute({ name, email, password })

        return res.status(201).json(user);
    }
}

export default new UserController();