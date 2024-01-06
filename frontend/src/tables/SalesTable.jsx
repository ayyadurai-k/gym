import React, { useState } from 'react'
import {fetchSales} from '../api/sales'
import { useEffect } from 'react'

const SalesTable = () => {
    const [sales, setSales] = useState([])

    useEffect(() => {
        async function api() {
            const sales = await fetchSales();
            setSales(sales)
        }
        api();
    },[])
    return (
        <div className="relative overflow-x-auto shadow-md border-2 border-black h-[400px]  mt-5 w-3/4 mx-auto">
            <table className="w-full text-sm text-center  text-gray-500 sm:rounded-lg dark:text-gray-400">
                <thead className="text-sm font-bold  uppercase border-b-2    bg-gray-400  text-black ">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left">
                            Products 
                        </th>
                        <th scope="col" className="px-6 py-3 text-left">
                            Seller
                        </th>
                        {/* <th scope="col" className="px-6 py-3">
                            Quantity
                        </th> */}
                        <th scope="col" className="px-6 py-3 text-left">
                            Price
                        </th>

                    </tr>
                </thead>
                <tbody>
                {sales.map((sale,index) => (                        
                            <tr key={index} className="text-black border-black  border-b">
                                <th  scope="row" className="px-6 py-4 font-semibold  whitespace-nowrap dark:text-white text-left">
                                    {sale.products} 
                                </th>
                                <th  scope="row" className="px-6 py-4 font-semibold  whitespace-nowrap dark:text-white text-left">
                                    {sale.seller} 
                                </th>
                                <td className="px-6 font-semibold py-4 text-left">
                                    ₹{sale.price}
                                </td>
                            </tr>
                        )
                    )}                                        
                </tbody>
            </table>
        </div>
    )
}

export default SalesTable