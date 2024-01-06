import { Router } from "express";
import { createMember, fetchMembers } from "../controllers/memberCtrl.js";
import { isAuthenticatedBranch } from "../middlewares/authenticate.js";
const memberRoute = Router()

memberRoute.post('/create',isAuthenticatedBranch,createMember)
memberRoute.get('/fetch-members',isAuthenticatedBranch,fetchMembers)

export default memberRoute;