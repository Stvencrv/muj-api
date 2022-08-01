import { Error } from "mongoose";

const mongoose = require('mongoose');

export const dbConnections = () => 
    mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true

    }).then(() => console.log('DB is connected'))
        .catch(() => console.error(Error));

