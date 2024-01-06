import Product from "../models/productMdl.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import asyncError from "../utils/asyncError.js";
import sendResponse from "../utils/sendResponse.js";
import { checkEmpty } from "../utils/validate.js";

export const fetchProducts = asyncError(async (req, res, next) => {
    const { fields } = req.query;
    const { _id: branchId } = req.branch;
    let products;
    if (fields) {
        const queryString = fields.join(" ").toString()
         products = await Product.find({ branchId }).select(queryString);
    }
    else {
         products = await Product.find({ branchId });
    }
    sendResponse(res, 200, "Products Fetched Successfully...!", products)
})
export const createProduct = asyncError(async (req, res, next) => {
    const { _id: branchId } = req.branch;
    const { productId, name, price } = req.body;
    if (checkEmpty([productId, name, price])) return next(new ErrorHandler("All Fields Are Required...!", 400))
    const product = await Product.findOne({ productId, branchId })
    if (product) return next(new ErrorHandler("Product Already Existsin This Branch...!", 400))
    const newProduct = await Product.create({
        productId, name, price, branchId
    })
    sendResponse(res, 200, "Products Created Successfully...!", newProduct)

})