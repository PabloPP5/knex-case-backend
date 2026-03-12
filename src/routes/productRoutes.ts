import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const productController = new ProductController();

router.get("/", authMiddleware, productController.index);
router.post("/", authMiddleware, productController.create);
router.put("/:id", authMiddleware, productController.update);

export default router;