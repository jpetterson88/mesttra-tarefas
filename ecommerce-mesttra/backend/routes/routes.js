const express = require("express");
const crypto = require("crypto");

const router = express.Router();

const products = [];

router.get("/", (req, res) => {
  res.send(products);
});

router.get("/:id", (req, res) => {
  const idParam = req.params.id;
  const product = products.find(product => product.id == idParam);

  if (!product) {
    res.status(404).send("Produto não encontrado")
  } else {
    res.send(product);
  }
});

router.post("/add", (req, res) => {
  const product = req.body;
  const newProduct = {
    id: crypto.randomUUID(),
    ...product
  }

  if (!product.name || !product.category || !product.price) {
    res.status(400).send("Está faltando dados do produto");
  } else {
    products.push(newProduct);
    res.status(201).send("Produto registrado com sucesso!");
  }
});

router.put("/edit/:id", (req, res) => {
  const idParam = req.params.id;
  const editProduct = req.body;
  const index = products.findIndex(product => product.id == idParam);

  products[index] = {
    ...products[index],
    ...editProduct
  }

  res.send("Produto alterado com sucesso!");
});

router.delete("/delete/:id", (req, res) => {
  const idParam = req.params.id;
  const index = products.findIndex(product => product.id == idParam);

  products.splice(index, 1);
  res.send(`Produto removido com sucesso!`);
});

module.exports = router;