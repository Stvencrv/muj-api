import { Schema, model, Document } from "mongoose";
import { Role } from "../utils/enums";
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: Role;
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Role
    }
}, {
    timestamps: true
});

userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
    const salt = bcrypt.genSaltSync(10);
    return await bcrypt.hash(password, salt);
}

// There is an ecs 5 function because of the scope, i need to reference the properties of the user schema.
userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    // @ts-ignore
    return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', userSchema)
