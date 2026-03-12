import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "minha_chave_secreta";

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { id: string };
};