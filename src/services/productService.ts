import connection from "../database/connection";

export class ProductService {
  async create(name: string, price: number, companyId: number) {
    if (!companyId) {
      throw new Error("Apenas colaboradores vinculados a uma empresa podem cadastrar produtos.");
    }

    const [productId] = await connection("products").insert({
      name,
      price,
      company_id: companyId
    });

    return { id: productId, name, price, company_id: companyId };
  }

  async listAll() {
    return await connection("products")
      .join("companies", "products.company_id", "=", "companies.id")
      .select("products.*", "companies.name as company_name");
  }

  async update(id: number, name: string, price: number, userCompanyId: number) {
    const product = await connection("products").where({ id }).first();

    if (!product) throw new Error("Produto não encontrado.");

    if (product.company_id !== userCompanyId) {
      throw new Error("Você não tem permissão para alterar produtos de outra empresa.");
    }

    await connection("products").where({ id }).update({ name, price });
    return { message: "Produto atualizado com sucesso." };
  }
}