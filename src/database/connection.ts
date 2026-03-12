import knex from "knex";

const connection = knex({
  client: "sqlite3",
  connection: {
    filename: "./database.sqlite"
  },
  useNullAsDefault: true
});

(async () => {
  try {
    if (!(await connection.schema.hasTable("companies"))) {
      await connection.schema.createTable("companies", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
      });
      console.log("Tabela 'companies' criada.");

      await connection("companies").insert([
        { id: 1, name: "Apple" },
        { id: 2, name: "Samsung" }
      ]);
      console.log("Empresas Apple e Samsung inseridas com sucesso.");
    }

    if (!(await connection.schema.hasTable("users"))) {
      await connection.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
        table.integer("company_id").unsigned().references("id").inTable("companies").onDelete("SET NULL");
      });
      console.log("Tabela 'users' criada.");
    }

    if (!(await connection.schema.hasTable("products"))) {
      await connection.schema.createTable("products", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.decimal("price", 10, 2).notNullable();
        table.integer("company_id").unsigned().notNullable()
             .references("id").inTable("companies").onDelete("CASCADE");
      });
      console.log("Tabela 'products' criada.");
    }

    if (!(await connection.schema.hasTable("transactions"))) {
      await connection.schema.createTable("transactions", (table) => {
        table.increments("id").primary();
        table.integer("user_id").unsigned().notNullable()
             .references("id").inTable("users").onDelete("CASCADE");
        table.integer("product_id").unsigned().notNullable()
             .references("id").inTable("products").onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(connection.fn.now());
      });
    console.log("Tabela 'transactions' criada.");
    }

  } catch (error) {
    console.error("Erro ao inicializar o banco:", error);
  }
})();

export default connection;