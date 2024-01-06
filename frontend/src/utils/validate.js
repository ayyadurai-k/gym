export const validateProducts = (products, who) => {
    let error = false;
    if (products.length <= 0) error = true
    if (!who || who.trim() === "") error = true
    products.forEach(product => {
        if (!(product.productId) || product.productId === "null") error = true
        if (!(product.quantity)) error = true
        if (!(product.price)) error = true
    })

    return error
}
export const validateProduct = (product) => {
    let error = false
    if (!product) return error = true
    if (!(product.productId) || product.productId === "null") error = true
    if (!(product.quantity)) error = true
    if (!(product.price)) error = true
    return error
}