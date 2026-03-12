import connection from "../database/connection";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserService {

  async register(name: string, email: string, password: string, companyId?: number) {
    const userExists = await connection("users").where({ email }).first();

    if (userExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [userId] = await connection("users").insert({
      name,
      email,
      password: hashedPassword,
      company_id: companyId || null
    });

    return { id: userId, name, email, companyId };
  }

  async login(email: string, password: string) {
    const user = await connection("users")
        .where({ email })
        .first();

    if (!user) {
        throw new Error("Credenciais inválidas");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error("Credenciais inválidas");
    }

    const token = jwt.sign(
        { 
            userId: user.id, 
            companyId: user.company_id
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    );

    return { token };
  }

  async getProfile(userId: number) {

    const user = await connection("users")
      .where({ id: userId })
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    delete user.password;

    return user;
  }

}