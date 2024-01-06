import Branch from "../models/branchMdl.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import asyncError from "../utils/asyncError.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import sendResponse from "../utils/sendResponse.js";
import sendToken from "../utils/sendToken.js";
import { checkEmpty, validateId } from "../utils/validate.js";

export const createBranch = asyncError(async (req, res, next) => {
    const { branchName, branchId, branchPassword, address } = req.body;
    if (checkEmpty([branchName, branchId, branchPassword, address])) {
        return next(new ErrorHandler("All Fields Are Must Required....!", 400))
    }
    const branch = await Branch.findOne({ branchId });
    if (branch) return next(new ErrorHandler("Branch Already Exists...!", 400))
    const hanshedPassword = await hashPassword(branchPassword)
    const newBranch = await Branch.create({ branchName, branchId, password: hanshedPassword, address });
    sendResponse(res, 201, "Branch Created Successfully...!", newBranch);
})

export const loginBranch = asyncError(async (req, res, next) => {
    const { branchId, password } = req.body;
    if (checkEmpty([branchId, password])) return next(new ErrorHandler("All Fields Are Must Required...!", 400))
    const branch = await Branch.findOne({ branchId })
    if (!branch) return next(new ErrorHandler("Invalid Credentials...!", 400))
    if (!(await comparePassword(password, branch.password))) return next(new ErrorHandler("Invalid Credentials...!", 400))
    sendToken(res, 'branchToken', branch);
})

export const fetchLoginBranch = asyncError(async (req, res, next) => {
    const {branch} = req
    sendResponse(res, 200, "Branch Fetched Successfully...!", branch)
})


export const fetchBranch = asyncError(async (req, res, next) => {
    const { id } = req.params;
    if (checkEmpty([id])) return next(new ErrorHandler("All Fields Are Must Required....!", 400))
    if (!validateId(id, next)) return next(new ErrorHandler("Invalid Branch ID....!"))
    const branch = await Branch.findById(id);
    if (!branch) return next(new ErrorHandler("Branch Doesn't Exists...!", 400))
    sendResponse(res, 200, "Branch Fetched Successfully...!", branch)
})

export const fetchBranches = asyncError(async (req, res, next) => {
    const branches = await Branch.find({})
    sendResponse(res, 200, "Barches Fetched Successfully...!", branches)
})

export const updateBranch = asyncError(async (req, res, next) => {
    const { id } = req.params;
    if (checkEmpty([id])) return next(new ErrorHandler("All Fields Are Must Required....!", 400))
    if (!validateId(id, next)) return next(new ErrorHandler("Invalid Branch ID....!"))
    const updatedBranch = await Branch.findByIdAndUpdate(id, { ...req.body }, { new: true })
    if (!updatedBranch) return next(new ErrorHandler("Branch Doesn't Exists...!", 400))
    sendResponse(res, 201, "Branch Updated Successfully...!", updatedBranch)
})

export const logoutBranch = asyncError(async (req, res, next) => {
    res.cookie('branchToken', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
        .status(200)
        .json({
            success: true,
            message: "Branch Logged Out Successfully...!"
        })
})
