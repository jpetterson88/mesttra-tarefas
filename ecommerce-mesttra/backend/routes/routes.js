const express = require("express");

const router = express.Router();

const products = [
  {
    id: 1,
    name: "Playstation 5",
    category: "Eletrônicos",
    price: "R$4000"
  },
  {
    id: 2,
    name: "Nintendo Wii",
    category: "Eletrônicos",
    price: "R$2000"
  },
  {
    id: 3,
    name: "Geladeira",
    category: "Eletrodomésticos",
    price: "R$2500"
  }
];

router.get("/", (req, res) => {
  res.send(products);
});

module.exports = router;