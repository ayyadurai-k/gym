import Product from "../models/productMdl.js";
import Purchase from "../models/purchaseMdl.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import asyncError from "../utils/asyncError.js";
import sendResponse from "../utils/sendResponse.js";
import { checkEmpty, validateId } from "../utils/validate.js";

export const createPurchase = asyncError(async (req, res, next) => {
    const { _id: branchId } = req.branch;
    const { products, buyer } = req.body;
    if (checkEmpty([products, buyer])) return next(new ErrorHandler("All Fields Are Required...!", 400))
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate();
    const newPurchase = await Purchase.create({
        products,
        branchId,
        buyer,
        year,
        month,
        date
    })
    for (let i = 0; i < products.length; i++) {
        await Product.findOneAndUpdate(
            { productId: products[i].productId, branchId }, {
            $inc: { 'quantity': products[i].quantity }
        }, { new: true })
    }
    sendResponse(res, 201, "Purchase Created Successfully....!", newPurchase)
})

export const fetchPurchase = asyncError(async (req, res, next) => {
    const { id } = req.params;
    if (!validateId(id)) return next(new ErrorHandler("Invalid Purchase ID...!", 400))
    const purchase = await Purchase.findById(id)
    if (!purchase) return next(new ErrorHandler("Purchase Doesn't Exists...!", 400))
    sendResponse(res, 200, "Purchase Fetched Successfully....!", purchase);
})

export const fetchPurchases = asyncError(async (req, res, next) => {
    const { _id: branchId } = req.branch;
    const purchases = await Purchase.find({branchId})
    const formatedPurchases = purchases.map(purchase=>{
        const price = purchase.products.reduce((prev,curr)=>prev+curr.price,0)
        const products =( purchase.products.map(product=>product.name)).toString();
        return {
            buyer : purchase.buyer,
            price,
            products
        }
    })
    sendResponse(res, 200, "Purchases Fetched Successfully...!", formatedPurchases)
})