// importa o Pool do postgres-node
const { Pool } = require("pg");

// inicio a minha classe de configuracao do pool de conexao
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ecommercemesttra",
  password: "123",
  port: "5432"
});

// const teste = async () => {
//   const result = await pool.query("SELECT * FROM products");
//   console.log(result.rows);
// }

// teste();

module.exports = pool;