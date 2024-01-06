import axios from "axios"

export const createSales = async (data, products) => {
    const nameAddedProducts = data.products.map((product) => {
        const { name } = products.find(p => p.productId ===parseInt(product.productId));
        return {
            ...product,
            name
        }
    })
    data.products = nameAddedProducts
    let res
    try {
         res = await axios.post("/api/v1/sales/create",data)
    }
    catch (err) {
        console.log(err);
    }
    return res.data.data
}

export const fetchSales = async()=>{
    return (await axios.get('/api/v1/sales/fetch-sales')).data.data
}