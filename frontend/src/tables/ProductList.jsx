import React, { useEffect } from 'react';
import Menubar from '../components/menu/Menubar';
import { fetchProducts } from '../api/product';
import { useState } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        async function api() {
            const products = await fetchProducts();
            setProducts(products)
        }
        api();
    },[])
    return (
        <>
            <Menubar />
            <div className='h-[100px] bg-blue-500 flex'>
                <p className='mx-auto text-white font-semibold text-5xl my-auto'>PRODUCTS</p>
            </div>
            <div className="relative overflow-x-auto h-[412px]  w-3/4 mx-auto mt-10 border-b border-l rounded-t-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs rounded-t-lg uppercase bg-gray-400 text-black  dark:text-gray-400">
                        <tr className='border-b border-white text-lg'>
                            <th scope="col" className="px-6 py-3 rounded-ss-lg">
                                Product ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product Name
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Product price
                            </th>
                        </tr>
                    </thead>

                    <tbody className="">
                        {products.map((product) => (
                            <tr key={product.productId} className="text-black border-black border-t border-b" >
                                <th scope="row" className="px-6 py-4 font-bold whitespace-nowrap dark:text-white">
                                    {product.productId}
                                </th>
                                <td className="px-6 font-semibold py-4">
                                    {product.name}
                                </td>
                                <td className="px-6 font-semibold py-4">
                                    {product.price}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
            
        </>
    )
}

export default ProductList