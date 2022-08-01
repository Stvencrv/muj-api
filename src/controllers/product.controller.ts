import { Request, Response } from 'express';
import Product, { IProducts } from "../models/product.model";
import { UserTokenRequest } from '../types/types';

const get = async (req: Request, res: Response) => {
    try {
        const courses = await Product.find();
        res.status(200).json(courses);
    } catch (error) {
        res.json(error);
    }
}

const getByid = async (req: Request, res: Response) => {
    const courseFound = await Product.findById(req.params.id);

    if (!courseFound) return res.status(204).json();

    return res.json(courseFound);
}

const createProduct = async (req: Request, res: Response): Promise<Response> => {

    const newCourse = new Product({
        name: req.body.name,
        photo: req.body .photo,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price, 
    });

    const savedCourse: IProducts = await newCourse.save();
    return res.json(savedCourse).status(201);
}

const updateProduct = async (req: Request, res: Response): Promise<Response> => {

    const courseUpdated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!courseUpdated) return res.status(204).json();
    return res.json(courseUpdated);
};

const deleteProduct = async (req: UserTokenRequest, res: Response) => {

    const courseFound = await Product.findByIdAndDelete(req.params.id);

    if (!courseFound) return res.status(204).json();
    return res.status(204).json();
}

export default {
    get,
    createProduct,
    updateProduct,
    deleteProduct,
    getByid
}



