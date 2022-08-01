import { Router } from 'express';

const router: Router = Router();

import productController from "../controllers/product.controller";

router.get('/', productController.get);
router.get("/:id/product", productController.getByid);
router.post("/add", productController.createProduct);
router.put("/edit/:id", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);

export default router;