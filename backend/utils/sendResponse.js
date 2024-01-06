const sendResponse = (res, statusCode, message, data) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data: data
    })
}

export default sendResponse;