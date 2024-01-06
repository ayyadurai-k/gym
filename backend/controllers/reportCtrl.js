import Purchase from "../models/purchaseMdl.js";
import Sales from "../models/salesMdl.js";
import asyncError from "../utils/asyncError.js";
import requirements from '../data/requirements.json'  assert {type: "json"}
import Member from "../models/memberMdl.js";
import Expence from "../models/expenseMdl.js";
import sendResponse from '../utils/sendResponse.js'
import { checkEmpty, validateEmail } from "../utils/validate.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { createHTML, sendMail } from '../utils/email.js'
import { addDays, convertStringToDate } from "../utils/date.js";

export const fetchReports = asyncError(async (req, res, next) => {
    const { _id: branchId } = req.branch;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    //CACULATE SALES AMOUNT
    const sales = await Sales.find({
        branchId,
        year,
        date,
        month
    }).select('products');

    const salesAmount = sales.reduce((prev, { products }) => {
        const productsPrice = products.reduce((prev, { price }) => {
            return prev + price
        }, 0)
        return prev + productsPrice
    }, 0)

    //CACULATE PURCHASE AMOUNT
    const purchases = await Purchase.find({
        branchId,
        year,
        date,
        month
    }).select('products');

    const purchaseAmount = purchases.reduce((prev, { products }) => {
        const productsPrice = products.reduce((prev, { price }) => {
            return prev + price
        }, 0)
        return prev + productsPrice
    }, 0)

    // CALCULATE NEW JOINEE AMOUNT
    const members = await Member.find({
        branchId,
        year,
        date,
        month
    }).select('requirement');
    const newJoineeAmount = members.reduce((prev, { requirement }) => {
        let fee = requirements[requirement].fee;
        return prev + fee
    }, 0)

    // CALCULATE EXPENCE AMOUNT
    const expences = await Expence.find({
        branchId,
        year,
        date,
        month
    }).select('price')

    const expencesAmount = expences.reduce((prev, { price }) => prev + price, 0)

    const totalAmount = (salesAmount + newJoineeAmount) - (purchaseAmount + expencesAmount);

    sendResponse(res, 200, "Reports Fetched Successfully....! ", {
        salesAmount,
        newJoineeAmount,
        purchaseAmount,
        expencesAmount,
        totalAmount
    })
})

export const sendReportsEmail = asyncError(async (req, res, next) => {
    const { salesAmount, newJoineeAmount, purchaseAmount, expencesAmount, email } = req.body;
    if (checkEmpty([salesAmount, newJoineeAmount, purchaseAmount, expencesAmount, email])) {
        return next(new ErrorHandler("All Fields Are Must Required...!", 400))
    }
    if (!validateEmail(email)) return next(new ErrorHandler("Enter A Valid Email...!", 400))
    const html = createHTML({
        salesAmount,
        newJoineeAmount,
        purchaseAmount,
        expencesAmount,
        branchName: req.branch.branchName,
        branchAddress: req.branch.address
    })
    try {
        await sendMail({
            to: email,
            html
        })
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }

    sendResponse(res, 200, "Email Send Successfully...!", { email })
})

export const fetchExpires = asyncError(async (req, res, next) => {
    const { _id: branchId } = req.branch;

    //CONVERTING DATE INTO NEEDED FORMAT
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1
    month = month > 9 ? month.toString() : `0${month}`
    let date = today.getDate()
    date = date > 9 ? date.toString() : `0${date }`
    const { DOE: checkingToday, DOJ: todayDate } = addDays({ year, month, date }, 5)
    //FIND MEMBERS WHO EXPIRES DAYS WITHIN 5 DAYS
    const members = await Member.find({
        DOE: { $lte: checkingToday },
        branchId
    }).select(['-branchId', '-DOB', '-gender', '-phone', '-__v'])

    //FINDING DAYS TO EXPIRES AND ADD TO RESULT
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const result = members.map((member) => {
        const diffDays = Math.round((member.DOE - todayDate) / ONE_DAY);
        return {
            memberId: member.memberId,
            name: member.name,
            DOJ: convertStringToDate(member.DOJ),
            DOE: convertStringToDate(member.DOE),
            expiresIn: diffDays
        }
    })
    sendResponse(res, 200, "Expires Fetched Successfully...!", result)
})