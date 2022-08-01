"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enums_1 = require("../utils/enums");
const orderSchema = new mongoose_1.Schema({
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
        type: enums_1.State,
    },
    description: {
        type: String,
    },
});
exports.default = (0, mongoose_1.model)('Order', orderSchema);
