import express, { Router } from "express";
import { productsRoute } from "./products.routes.js";

const routes: Router = express.Router();

routes.use(productsRoute);

export { routes };
