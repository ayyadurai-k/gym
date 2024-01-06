import { Router } from "express";
import { fetchTrainers } from "../controllers/trainerCtrl.js";
import { isAuthenticatedBranch } from "../middlewares/authenticate.js";
const trainerRoute = Router();

trainerRoute.get('/fetch-trainers',isAuthenticatedBranch,fetchTrainers)


export default trainerRoute;