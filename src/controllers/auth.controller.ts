import { Request, Response } from 'express';
import User, { IUser } from "../models/users.model";
import jwt from 'jsonwebtoken';
import { UserTokenRequest } from 'types/types';

const singup = async (req:Request, res:Response) => {
    
    const newUser: IUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role || 2
    });

    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json('Email already exists');


    newUser.password = await newUser.encryptPassword(newUser.password);
    const savedUser: IUser = await newUser.save();
    const token: string = jwt.sign({ _id: savedUser._id }, process.env.SECRET_KEY || 'PROVISIONAL_SECRET');
   
    res.status(200).json({token, savedUser});
}

const singin = async (req:Request, res:Response) => {
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json('Email wrong');

    const correctPassword = await user.validatePassword(req.body.password);
    if (!correctPassword) return res.status(400).json('Invalid Password');

    const token: string = jwt.sign({ _id: user._id, name: user.name }, process.env.SECRET_KEY || 'SECRET_PROVISIONAL' ,{
        expiresIn: 60 * 60 * 24
    });

    res.status(200).json({token, user});
}

const profile = async (req: UserTokenRequest, res: Response) => {

    const user = await User.findById(req.userId, {password: 0});
    if (!user) return res.status(404).json("No user found");

    res.json(user);
}

const logout = async (req:Request, res:Response) => {
    res.send({
        message: 'success'
    });
}

export {
    singup,
    singin,
    profile,
    logout
}