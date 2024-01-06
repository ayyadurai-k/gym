import axios from "axios"
export const fetchProducts = async() => {
    let res
    try{
        res =await  axios.get('/api/v1/product/fetch-products')
    }catch(err){
        console.log(err);
    }
    return res.data.data
}
export const fetchProductsForOptions = async() => {
    let res
    try{
        res =await  axios.get('/api/v1/product/fetch-products?fields[]=name&fields[]=productId')
    }catch(err){
        console.log(err);
    }
     return res.data.data
}