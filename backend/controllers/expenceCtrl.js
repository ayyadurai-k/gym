import Expence from "../models/expenseMdl.js";
import asyncError from "../utils/asyncError.js";
import sendResponse from "../utils/sendResponse.js";

export const createExpence = asyncError(async (req, res, next) => {
    const { _id: branchId } = req.branch;
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate();
    const expence = await Expence.create({
        ...req.body,
        branchId,
        year,
        month,
        date
    })
    sendResponse(res, 201, "Expence Created Successfully...!", expence)
})

export const fetchExpences = asyncError(async (req, res, next) => {
    const { _id: branchId } = req.branch;
    const expences = await Expence.find({branchId})
    sendResponse(res, 200, "Expences Fetched Successfully...!", expences)
})