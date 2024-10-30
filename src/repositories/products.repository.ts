import { FieldPacket, QueryResult, ResultSetHeader } from "mysql2/promise";
import { con } from "../config/database.js";
import { Product } from "../types/products.type.js";

export const productsRepository = {
  getAll(): Promise<[QueryResult, FieldPacket[]]> {
    return con.query(
      "SELECT p.id, p.name, p.price, c.colorName as color FROM products p INNER JOIN colors c ON p.colorID = c.id"
    );
  },
  getOne(id: number): Promise<[QueryResult, FieldPacket[]]> {
    return con.query(
      "SELECT p.id, p.name, p.price, c.colorName as color FROM products p INNER JOIN colors c ON p.colorID = c.id WHERE p.id = ?",
      [id]
    );
  },
  async create(payload: Product): Promise<[QueryResult, FieldPacket[]]> {
    const [data]: [QueryResult, FieldPacket[]] = await con.query(
      "INSERT INTO products(name, price, colorID) VALUES(?,?,?)",
      [payload.name, payload.price, payload.colorID]
    );
    const { insertId } = data as unknown as ResultSetHeader;
    return con.query(
      "SELECT p.id, p.name, p.price, c.colorName as color FROM products p INNER JOIN colors c ON p.colorID = c.id WHERE p.id = ?",
      [insertId]
    );
  },
  async update(
    id: number,
    payload: Product
  ): Promise<[QueryResult, FieldPacket[]] | { msg: string }> {
    const [finds]: [QueryResult, FieldPacket[]] = await con.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );
    const exist: Array<Product> = finds as unknown as Array<Product>;
    if (!exist.length) {
      return { msg: "Not found" };
    }
    return con.query(
      `UPDATE products
      SET name = ?,
          price = ?,
          colorID = ?
      WHERE id = ?`,
      [
        payload.name || finds[0].name,
        payload.price || finds[0].price,
        payload.colorID || finds[0].colorID,
        id,
      ]
    );
  },
  delete(id: number): Promise<[QueryResult, FieldPacket[]]> {
    return con.query("DELETE FROM products WHERE id = ?", [id]);
  },
};
