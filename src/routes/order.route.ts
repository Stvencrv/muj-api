import {
    createOrders,
    getOrders,
    updateOrderStatus
} from "../controllers/order.controller";

import { Router } from "express";

const router: Router = Router();

router.post("/add", createOrders);
router.get('/', getOrders);
router.put("/:id/orderStatus", updateOrderStatus);

export default router;