import { Router } from "express";
import { createExpence, fetchExpences } from "../controllers/expenceCtrl.js";
import { isAuthenticatedBranch } from "../middlewares/authenticate.js";
const expenceRoute = Router();

expenceRoute.post('/create', isAuthenticatedBranch, createExpence)
expenceRoute.get('/fetch-expences', isAuthenticatedBranch, fetchExpences)


export default expenceRoute;