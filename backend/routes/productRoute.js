import { Router } from "express";
import { createProduct, fetchProducts } from "../controllers/productCtrl.js";
import { isAuthenticatedBranch } from "../middlewares/authenticate.js";
const productRoute = Router();

productRoute.post('/create',isAuthenticatedBranch,createProduct)
productRoute.get('/fetch-products',isAuthenticatedBranch,fetchProducts)


export default productRoute