import { client } from "../config/redis.js";

export async function cacheGetProducts(req, res, next) {
  const cache: string = await client.get("getProducts");
  if (cache) {
    res.json(JSON.parse(cache));
  } else {
    next();
  }
}

export async function cacheGetOneProduct(req, res, next) {
  const id: number = Number(req.params.id);
  const cache: string = await client.get(`getProduct-${id}`);
  if (cache) {
    res.json(JSON.parse(cache));
  } else {
    next();
  }
}
