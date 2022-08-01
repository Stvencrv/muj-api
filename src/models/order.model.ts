import { Schema, model, Document } from 'mongoose';
import { State } from '../utils/enums';

export interface IOrder extends Document {
    userId: string;
    productId: string;
    amount: number;
    state: State;
    description: string;
}  

const orderSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    state: {
        type: State,
    },
    description: {
        type: String,
    },
});

export default model<IOrder>('Order', orderSchema);