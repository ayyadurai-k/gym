import { Router } from "express";
import {
    createBranch,
    fetchBranch,
    fetchBranches,
    fetchLoginBranch,
    loginBranch,
    logoutBranch,
    updateBranch
} from "../controllers/branchCtrl.js";
import { isAuthenticatedAdmin, isAuthenticatedBranch } from "../middlewares/authenticate.js";


const branchRoute = Router();

branchRoute.post('/create', isAuthenticatedAdmin, createBranch)
branchRoute.get('/fetch-branch/:id', fetchBranch)
branchRoute.get('/fetch-login-branch', isAuthenticatedBranch,fetchLoginBranch)
branchRoute.get('/fetch-branches', fetchBranches)
branchRoute.post('/login', loginBranch)
branchRoute.put('/update/:id', isAuthenticatedAdmin, updateBranch)
branchRoute.put('/logout', isAuthenticatedBranch, logoutBranch)


export default branchRoute;