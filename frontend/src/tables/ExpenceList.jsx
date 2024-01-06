import React, { useEffect } from 'react'
import { fetchExpence } from '../api/expence';
import { useState } from 'react';

const ExpenceList = () => {
    const [expence, setExpence] = useState([])
    useEffect(() => {
        async function api() {
            const expence = await fetchExpence();
            setExpence(expence)
        }
        api();
    },[])
    return (
        <>           
            <div className="relative overflow-x-auto h-[412px]  w-3/4 mx-auto mt-10 border-b border-l rounded-t-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs rounded-t-lg uppercase bg-gray-400 text-black  dark:text-gray-400">
                        <tr className='border-b border-white text-lg'>
                            <th scope="col" className="px-6 py-3 rounded-ss-lg">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Who
                            </th>
                        </tr>
                    </thead>

                    <tbody className="">
                        {expence.map((expences,index) => (
                            <tr key={index} className="bg-white text-black border-black border-t border-b" >
                                <th scope="row" className="px-6 py-4 font-bold whitespace-nowrap dark:text-white">
                                    {expences.title}
                                </th>
                                <td className="px-6 font-semibold py-4">
                                    {expences.price}
                                </td>
                                <td className="px-6 font-semibold py-4">
                                    {expences.who}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
            
        </>
    )
}

export default ExpenceList