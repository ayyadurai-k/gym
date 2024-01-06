import Trainer from "../models/trainerMdl.js";
import asyncError from "../utils/asyncError.js";
import sendResponse from "../utils/sendResponse.js";


export const fetchTrainers = asyncError(async (req, res, next) => {
    const { _id: branchId } = req.branch;
    const trainers = await Trainer.find({ branchId })
    sendResponse(res, 200, "Trainers Fetched Successfully...!", trainers)
})
