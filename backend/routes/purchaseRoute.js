import { Router } from "express";
import { createPurchase, fetchPurchases } from "../controllers/purchaseCtrl.js";
import { isAuthenticatedBranch } from "../middlewares/authenticate.js";

const purchaseRoute = Router();

purchaseRoute.post('/create',isAuthenticatedBranch,createPurchase)
purchaseRoute.get('/fetch-purchases',isAuthenticatedBranch,fetchPurchases)

export default purchaseRoute;