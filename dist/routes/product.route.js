"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
router.get('/', product_controller_1.default.get);
router.get("/:id/product", product_controller_1.default.getByid);
router.post("/add", product_controller_1.default.createProduct);
router.put("/edit/:id", product_controller_1.default.updateProduct);
router.delete("/delete/:id", product_controller_1.default.deleteProduct);
exports.default = router;
