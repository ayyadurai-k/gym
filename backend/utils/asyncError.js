
const asyncError = (func)=>{
    return (req,res,next)=>{
        return Promise.resolve(func(req,res,next)).catch(next)
    }
}

export default asyncError;