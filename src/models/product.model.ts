import { Schema, model, Document } from "mongoose";

export interface IProducts extends Document{ 
    name: string;
    photo: string;
    category: string;
    description: string;
    price: number;
}

const productSchema = new Schema({
    name: {
        type: String,
    },
    photo: {
        type: String,
    },
    category: { 
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
});

export default model<IProducts>('Products', productSchema);