import jwt from "jsonwebtoken"

export const generateToken = (payload) => {
    const { ACCESS_TOKEN_SECRET } = process.env;
    const token = jwt.sign(
        payload,
        ACCESS_TOKEN_SECRET
    )
    return token;
}