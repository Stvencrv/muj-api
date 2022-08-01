import { Request } from "express";

export interface UserTokenRequest extends Request {
    userId?: string;
    name?: string;
}