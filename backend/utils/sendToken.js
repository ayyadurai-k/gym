import { generateToken } from "./jwt.js";

const sendToken = (res, tokenName, data) => {

    const token = generateToken({
        _id: data._id,
    });

    //setting cookies 
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    }

    return res.status(200)
        .cookie(tokenName, token, options)
        .json({
            success: true,
            token,
            data
        })
}

export default sendToken;