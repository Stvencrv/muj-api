import { Request, Response } from 'express';
import { UserTokenRequest } from "../types/types";
import jwt from 'jsonwebtoken';

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
    name: string;

}
export const TokenValidation = (req: UserTokenRequest, res:Response) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json('No token provided');

        const token: string = authHeader.split(' ')[1];

        const payload = jwt.verify(token, process.env.SECRET_KEY || 'PROVISIONAL_SECRET') as IPayload;
     
        req.userId = payload._id;
        req.name = payload.name;

        res.send(payload);
    } catch (e) {
        res.status(400).send('Invalid Token');
    }
}