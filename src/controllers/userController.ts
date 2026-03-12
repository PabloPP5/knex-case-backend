import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {

  private userService = new UserService();

  register = async (req: Request, res: Response) => {
    try {

      const { name, email, password, companyId } = req.body;
      const user = await this.userService.register(name, email, password, companyId);
      res.json(user);
      
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {

      const { email, password } = req.body;
      const token = await this.userService.login(email, password);
      res.json(token);

    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  profile = async (req: Request, res: Response) => {
  try {

    const userId = (req as any).userId;
    const user = await this.userService.getProfile(userId);
    res.json(user);

  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
  };

}