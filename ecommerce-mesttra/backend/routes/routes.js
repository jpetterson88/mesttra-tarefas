const express = require("express");
const crypto = require("crypto");

const router = express.Router();

const products = [
  {
    id: crypto.randomUUID(),
    name: "Playstation 5",
    category: "Eletrônicos",
    price: "R$4000"
  },
  {
    id: crypto.randomUUID(),
    name: "Nintendo Wii",
    category: "Eletrônicos",
    price: "R$2000"
  },
  {
    id: crypto.randomUUID(),
    name: "Geladeira",
    category: "Eletrodomésticos",
    price: "R$2500"
  }
];

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

router.delete("/delete/:id", (req, res) => {
  const idParam = req.params.id;
  const productIndex = products.findIndex(product => product.id == idParam);

  products.splice(productIndex, 1);
  res.send(`Produto removido com sucesso!`);
});

module.exports = router;