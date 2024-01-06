import { sanitizeFilter } from "mongoose";
import Product from "../models/productMdl.js";
import Sales from "../models/salesMdl.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import asyncError from "../utils/asyncError.js";
import sendResponse from "../utils/sendResponse.js";
import { checkEmpty, validateId } from "../utils/validate.js";

export const createSales = asyncError(async (req, res, next) => {
    const { _id: branchId } = req.branch;
    const { products, seller } = req.body;
    if (checkEmpty([products, seller])) return next(new ErrorHandler("All Fields Are Required...!", 400))
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate();
    const newSales = await Sales.create({
        products,
        branchId,
        seller,
        year,
        month,
        date
    })
    for (let i = 0; i < products.length; i++) {
        await Product.findOneAndUpdate(
            { productId: products[i].productId, branchId }, {
            $inc: { 'quantity': ((products[i].quantity) * -1) }
        }, { new: true })
    }
    sendResponse(res, 201, "Sales Created Successfully....!", newSales)
})

export const fetchSale = asyncError(async (req, res, next) => {
    const { id } = req.params;
    if (!validateId(id)) return next(new ErrorHandler("Invalid Sales ID...!", 400))
    const Sale = await Sale.findById(id)
    if (!Sale) return next(new ErrorHandler("Sales Doesn't Exists...!", 400))
    sendResponse(res, 200, "Sales Fetched Successfully....!", Sale);
})

export const fetchSales = asyncError(async (req, res, next) => {
    const { _id: branchId } = req.branch;
    const sales = await Sales.find({branchId})
    const formatedSales = sales.map(sale=>{
        const price = sale.products.reduce((prev,curr)=>prev+curr.price,0)
        const products =( sale.products.map(product=>product.name)).toString();
        return {
            seller : sale.seller,
            price,
            products
        }
    })
    sendResponse(res, 200, "Saless Fetched Successfully...!", formatedSales)
})