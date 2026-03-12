import { Request, Response } from "express";
import { ProductService } from "../services/productService";

export class ProductController {
  private productService = new ProductService();

  create = async (req: Request, res: Response) => {
    console.log("ID da empresa vindo do token:", (req as any).companyId);
    try {
      const { name, price } = req.body;
      const companyId = (req as any).companyId;

      const product = await this.productService.create(name, price, companyId);
      res.status(201).json(product);
    } catch (error: any) {
      res.status(403).json({ error: error.message });
    }
  };

  index = async (req: Request, res: Response) => {
    const products = await this.productService.listAll();
    res.json(products);
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, price } = req.body;
      const companyId = (req as any).companyId;

      const result = await this.productService.update(Number(id), name, price, companyId);
      res.json(result);
    } catch (error: any) {
      res.status(403).json({ error: error.message });
    }
  };
}