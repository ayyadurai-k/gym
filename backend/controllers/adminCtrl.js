import asyncError from "../utils/asyncError.js";
import Admin from "../models/adminMdl.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendToken from "../utils/sendToken.js";
import { comparePassword } from "../utils/password.js";
import { checkEmpty } from "../utils/validate.js";
import Branch from "../models/branchMdl.js";
import sendResponse from "../utils/sendResponse.js";

export const loginAdmin = asyncError(async (req, res, next) => {
    const { username, password } = req.body;
    if (checkEmpty([username, password])) {
        return next(new ErrorHandler("All Fields Are Must Required....!", 400))
    }
    const admin = await Admin.findOne({ username });
    if (!admin) return next(new ErrorHandler("Invalid Credentials...!", 400));
    if (!(await comparePassword(password, admin.password))) return next(new ErrorHandler("Invalid Credentials...!", 400));
    sendToken(res,'adminToken', admin)
})

export const getAdminPanel = asyncError(async(req,res,next)=>{
    const admin = req.admin;
    const branches = await Branch.find({});
    sendResponse(res,200,"Admin Panel Fetched Successfully...!",{
        admin,
        branches
    })
})

export const logoutAdmin = asyncError(async (req, res, next) => {
    res.cookie('adminToken', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
        .status(200)
        .json({
            success: true,
            message: "Admin Logged Out Successfully...!"
        })
})