import { Request, Response } from 'express';
import { State } from '../utils/enums';
import Order, { IOrder } from "../models/order.model";
import { UserTokenRequest } from '../types/types';


const createOrders = async (req: UserTokenRequest, res: Response) => {
    const newOrder: IOrder = new Order({
        userId: req.body.userId,
        userName: req.body.userName,
        productId: req.body.productId,
        amount: req.body.amount,
        state: req.body.state || 'New',
        description: req.body.description
    });

    try {
        const savedOrder: IOrder = await newOrder.save();
        res.json(savedOrder).status(201); 
    } catch (error) {
        res.json(error).status(500);
    } 
}

const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.json(error);
    }
}

const updateOrderStatus = async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    
    if (!order) return res.status(404).json('Order not found');

    if(order.state === 'New') {
        order.state = State.InProgress;
    } else if (order.state === 'InProgress')  {
       order.state = State.Finished;
    } else {
        return res.send('la orden ya esta finalizada');	    
    }
    
    const updatedOrder = await order.save();
    res.json(updatedOrder).status(202);
}

export {
    createOrders,
    getOrders,
    updateOrderStatus
}

