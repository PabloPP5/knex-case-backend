import { Router, Request, Response } from "express";
import { TransactionService } from "../services/transactionService";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const transactionService = new TransactionService();

router.post("/:productId", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const userId = (req as any).userId;
    const result = await transactionService.create(userId, Number(productId));
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});
export default router;