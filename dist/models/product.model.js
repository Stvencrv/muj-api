"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)('Products', productSchema);
