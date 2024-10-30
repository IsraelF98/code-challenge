import mysql from "mysql2/promise";

const con: mysql.Connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "store",
});

export { con };
