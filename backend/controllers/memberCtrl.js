import Member from "../models/memberMdl.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import asyncError from "../utils/asyncError.js";
import { addDays, addZeroToDate } from "../utils/date.js";
import sendResponse from "../utils/sendResponse.js";
import requirements from '../data/requirements.json'  assert {type: "json"}

export const createMember = asyncError(async (req, res, next) => {
    const { _id: branchId } = req.branch;
    const { memberId, year, month, date, requirement } = req.body;
    const { DOJ, DOE } = addDays(addZeroToDate(year, month, date ), requirements[requirement].days);
    const member = await Member.findOne({ memberId, branchId })
    if (member) return next(new ErrorHandler("Member Already Exists In This Branch....!"));
    const newMember = await Member.create({
        ...req.body,
        year, month, date,
        DOJ,
        DOE,
        branchId
    });
    sendResponse(res, 201, "Member Created Successfully...!", newMember)
})

export const fetchMembers = asyncError(async (req, res, next) => {
    const { _id: branchId } = req.branch;
    const members = await Member.find({ branchId })
    sendResponse(res, 200, "Members Fetched Successfully...!", members)
})