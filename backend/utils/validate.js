import ErrorHandler from "./ErrorHandler.js";
import { Types } from "mongoose";

export const checkEmpty = (fields) => {
    let empty = false;
    fields.forEach(field => {
        if (!field && field!==0) {
            empty = true
        }
    });
    return empty
}

export const validateId = (id, next) => {
    const isValid = Types.ObjectId.isValid(id);
    return isValid;
}

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
