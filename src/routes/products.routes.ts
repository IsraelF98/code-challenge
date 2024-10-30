import { Router } from "express";
import { productsRepository } from "../repositories/products.repository.js";
import { client } from "../config/redis.js";
import { cacheGetProducts, cacheGetOneProduct } from "../middlewares/cache.js";
import { Product } from "../types/products.type.js";
import { FieldPacket, QueryResult } from "mysql2/promise";

export const productsRoute = Router();
productsRoute.put("/products/:id", async (req, res) => {
  try {
    const payload: Product = req.body;
    const id: number = Number(req.params.id);

    await productsRepository.update(id, payload);
    client.del("getProducts");
    client.del(`getProduct-${id}`);
    res.json({ msg: "OK" });
  } catch (error) {
    res.status(500).json({ msg: error.sqlMessage || error.message });
  }
});

productsRoute.get("/products", cacheGetProducts, async (req, res) => {
  try {
    const [data]: [QueryResult, FieldPacket[]] =
      await productsRepository.getAll();
    client.setEx("getProducts", 300, JSON.stringify(data));
    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: error.sqlMessage || error.message });
  }
});

productsRoute.get("/products/:id", cacheGetOneProduct, async (req, res) => {
  try {
    const id: number = Number(req.params.id);

    const data: [QueryResult, FieldPacket[]] = await productsRepository.getOne(
      id
    );
    client.setEx(`getProduct-${id}`, 300, JSON.stringify(data[0]));
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ msg: error.sqlMessage });
  }
});

productsRoute.post("/products", async (req, res) => {
  try {
    const payload: Product = req.body;

    const [data] = await productsRepository.create(payload);
    client.del("getProducts");
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ msg: error.sqlMessage });
  }
});

productsRoute.delete("/products/:id", async (req, res) => {
  try {
    const id: number = Number(req.params.id);

    await productsRepository.delete(id);
    client.del("getProducts");
    client.del(`getProduct-${id}`);
    res.json({ msg: "OK" });
  } catch (error) {
    res.status(500).json({ msg: error.sqlMessage });
  }
});
