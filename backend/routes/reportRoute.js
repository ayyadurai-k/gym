import { Router } from "express";
import { fetchExpires, fetchReports, sendReportsEmail } from "../controllers/reportCtrl.js";
import { isAuthenticatedBranch } from "../middlewares/authenticate.js";

const reportRoute = Router();

reportRoute.get('/fetch-reports',isAuthenticatedBranch,fetchReports)
reportRoute.post('/send-reports-email',isAuthenticatedBranch,sendReportsEmail)
reportRoute.get('/fetch-expires',isAuthenticatedBranch,fetchExpires)

export default reportRoute;