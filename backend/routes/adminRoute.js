import { Router } from "express";
import { getAdminPanel, loginAdmin, logoutAdmin } from "../controllers/adminCtrl.js";
import { isAuthenticatedAdmin } from "../middlewares/authenticate.js";

const adminRoute = Router();

adminRoute.post('/login',loginAdmin)
adminRoute.get('/panel',isAuthenticatedAdmin,getAdminPanel)
adminRoute.put('/logout',isAuthenticatedAdmin,logoutAdmin)

export default adminRoute;