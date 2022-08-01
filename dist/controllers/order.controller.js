"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrders = exports.createOrders = void 0;
const enums_1 = require("../utils/enums");
const order_model_1 = __importDefault(require("../models/order.model"));
const createOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newOrder = new order_model_1.default({
        userId: req.body.userId,
        userName: req.body.userName,
        productId: req.body.productId,
        amount: req.body.amount,
        state: req.body.state || 'New',
        description: req.body.description
    });
    try {
        const savedOrder = yield newOrder.save();
        res.json(savedOrder).status(201);
    }
    catch (error) {
        res.json(error).status(500);
    }
});
exports.createOrders = createOrders;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.default.find();
        res.status(200).json(orders);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getOrders = getOrders;
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const order = yield order_model_1.default.findById(orderId);
    if (!order)
        return res.status(404).json('Order not found');
    if (order.state === 'New') {
        order.state = enums_1.State.InProgress;
    }
    else if (order.state === 'InProgress') {
        order.state = enums_1.State.Finished;
    }
    else {
        return res.send('la orden ya esta finalizada');
    }
    const updatedOrder = yield order.save();
    res.json(updatedOrder).status(202);
});
exports.updateOrderStatus = updateOrderStatus;
