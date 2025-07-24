import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface ITokenPayLoad {
    iat: number;
    exp: number;
    sub: string;
}

export function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('Token not provided.')
    }

    const [, token] = authHeader.split(' ');

    
    try {
        const decodedToken = verify(token, process.env.JWT_SECRET || 'fallback_secret');

        const { sub } = decodedToken as ITokenPayLoad

        request.user = {
            id:sub,
        };

        return next();
    } catch {
        throw new Error('Invalid JWT Token.')
    }
}