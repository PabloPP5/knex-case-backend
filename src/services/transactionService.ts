import connection from "../database/connection";

export class TransactionService {
  async create(userId: number, productId: number) {
    const product = await connection("products").where({ id: productId }).first();
    if (!product) throw new Error("Produto não encontrado.");

    const [transactionId] = await connection("transactions").insert({
      user_id: userId,
      product_id: productId
    });

    return { 
      id: transactionId, 
      message: `Compra do produto '${product.name}' realizada com sucesso!` 
    };
  }

  async listByUser(userId: number) {
    return await connection("transactions")
      .join("products", "transactions.product_id", "=", "products.id")
      .where("transactions.user_id", userId)
      .select("transactions.id", "products.name", "products.price", "transactions.created_at");
  }
}