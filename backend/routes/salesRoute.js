import { Router } from "express";
import { createSales, fetchSale, fetchSales } from "../controllers/salesCtrl.js";
import { isAuthenticatedBranch } from "../middlewares/authenticate.js";

const salesRoute = Router();

salesRoute.post('/create', isAuthenticatedBranch, createSales)
salesRoute.get('/fetch-sale', isAuthenticatedBranch, fetchSale)
salesRoute.get('/fetch-sales', isAuthenticatedBranch, fetchSales)

export default salesRoute;