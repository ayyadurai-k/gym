const error = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500

    if (process.env.ENVIROMENT === "development") {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack
        })
    }
    if (process.env.ENVIROMENT === "production") {
        let message = err.message;
        let error = new Error(message);

        if (err.name === "ValidationError") {
            message = Object.keys(err.errors).map(key => {
                return err.errors[key].message;
            })
            error = new Error(message)
            err.statusCode = 400;
        }
        
        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error',
        })
    }
}
export default error;