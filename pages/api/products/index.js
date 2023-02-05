const pool = require("../../../db/connection");

export const getProducts = async () => {
  const products = await pool.query("SELECT * FROM products ORDER BY id ASC");
  return products.rows;
};

export const getProductsByCategory = async (category) => {
  const products = await pool.query(
    "SELECT * FROM products WHERE categories LIKE '%' || $1 || '%' ",
    [category]
  );
  return products.rows;
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const products = await getProducts();
      res.json(products);
    } catch (e) {
      console.log(e.message);
    }
  }
}
