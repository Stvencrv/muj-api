"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnections = void 0;
const mongoose_1 = require("mongoose");
const mongoose = require('mongoose');
const dbConnections = () => mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log('DB is connected'))
    .catch(() => console.error(mongoose_1.Error));
exports.dbConnections = dbConnections;
