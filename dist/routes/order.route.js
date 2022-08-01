"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_controller_1 = require("../controllers/order.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/add", order_controller_1.createOrders);
router.get('/', order_controller_1.getOrders);
router.put("/:id/orderStatus", order_controller_1.updateOrderStatus);
exports.default = router;
