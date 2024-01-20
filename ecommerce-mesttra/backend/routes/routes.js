const express = require("express");
const crypto = require("crypto");
const pool = require("../dbConfig");

const router = express.Router();

router.get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM products");
  res.send(rows);
});

router.get("/:id", async (req, res) => {
  const idParam = req.params.id;
  const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [
    idParam,
  ]);

  if (rows.length === 0) {
    res.status(404).send("Produto não encontrado");
  } else {
    res.send(rows);
  }
});

router.post("/add", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.category || !product.price) {
    res.status(400).send("Está faltando dados do produto");
  } else {
    const { rows } = await pool.query(
      "INSERT INTO products (id, name, category, price) VALUES ($1, $2, $3, $4) RETURNING *",
      [crypto.randomUUID(), product.name, product.category, product.price]
    );

    res.status(201).json({
      status: "Produto cadastrado com sucesso",
      data: rows
    });
  }
});

router.put("/edit/:id", async (req, res) => {
  const idParam = req.params.id;
  const editProduct = req.body;

  const { rows } = await pool.query(
    "UPDATE products SET name = $1, category = $2, price = $3 WHERE id = $4 RETURNING *",
    [editProduct.name, editProduct.category, editProduct.price, idParam]
  );

  res.json({
    status: "Produto alterado com sucesso",
    data: rows
  });
});

router.delete("/delete/:id", async (req, res) => {
  const idParam = req.params.id;
  const { rows } = await pool.query("DELETE FROM products WHERE id = $1", [idParam]);

  res.json({
    status: "Produto removido com sucesso!",
    data: rows
  });
});

module.exports = router;