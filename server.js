import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.post("/products", async (req, res) => {
  await prisma.product.create({
    data: {
      name: req.body.name,
      category: req.body.category,
      amount: req.body.amount,
    },
  });
  res.status(201).json(req.body);
});

app.get("/products", async (req, res) => {
  let products = [];

  if (req.query) {
    products = await prisma.product.findMany({
      where: {
        name: req.query.name,
        category: req.query.category,
        amount: req.query.amount
      },
    });
  } else {
    products = await prisma.product.findMany();
  }

  res.status(201).json(products);
});

app.put("/products/:id", async (req, res) => {
  await prisma.product.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      category: req.body.category,
      amount: req.body.amount,
    },
  });
  res.status(201).json(req.body);
});

app.delete("/products/:id", async (req, res) => {
  await prisma.product.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "Produto deletado" });
});

app.listen(4000);
