import { useEffect, useState } from 'react'
import { fetchPurchases } from '../api/purchase';

const PurchaseTable = () => {
    const [purchases, setPurchases] = useState([])

    useEffect(() => {
        async function api() {
            const purchases = await fetchPurchases();
            setPurchases(purchases)
        }
        api();
    },[])

    return (
        <div className="relative overflow-x-auto shadow-md border-2 border-black h-[400px]  mt-5 w-3/4 mx-auto">
            <table className="w-full text-sm text-center  text-gray-500 sm:rounded-lg dark:text-gray-400">
                <thead className="text-sm font-bold  uppercase border-b-2    bg-gray-400  text-black ">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left">
                            Purchase name
                        </th>

                        <th scope="col" className="px-6 py-3 text-left">
                            Buyer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left">
                            Price
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {purchases.map((purchase,index) => (
                       
                            <tr key={index}  className="text-black border-black  border-b">
                                <th  scope="row" className="px-6 py-4 font-semibold  whitespace-nowrap dark:text-white text-left">
                                    {purchase.products}
                                </th>
                                <td className="px-6 font-semibold py-4 text-left">
                                    {purchase.buyer}
                                </td>
                                <td className="px-6 font-semibold py-4 text-left">
                                    ₹{purchase.price}
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default PurchaseTable