import { Role } from "../../generated/prisma";
import { prisma } from "../lib/prisma";
import { hash } from 'bcryptjs'

interface IReq {
    name: string
    email: string
    password: string
    role?: Role
}

class CreateUserService {
    public async execute({ name, email, password, role }: IReq) {
        const userExists = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (userExists) {
            throw new Error("This email is already included with an account. Do you want to log in?")
        }

        const hashedPassword = await hash(password, 10)
        const user = await prisma.user.create({
            data: {
                name, 
                email,
                password: hashedPassword,
                role,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        })

        return user;
    }
}

export default CreateUserService;