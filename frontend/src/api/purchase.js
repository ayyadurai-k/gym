import axios from "axios"

export const createPurchase = async (data, products) => {
    console.log(data);
    const nameAddedProducts = data.products.map((product) => {
        const { name } = products.find(p => p.productId ===parseInt(product.productId));
        return {
            ...product,
            name
        }
    })
    data.products = nameAddedProducts
    console.log(data);
    return await axios.post('/api/v1/purchase/create', data)
}

export const fetchPurchases = async()=>{
    return (await axios.get('/api/v1/purchase/fetch-purchases')).data.data
}