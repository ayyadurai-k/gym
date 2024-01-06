import React, { useContext, useEffect, useState } from 'react'
import { CiSquarePlus } from 'react-icons/ci';
import { Context } from '../context/Context';
import { createSales } from '../api/sales';
import { fetchProductsForOptions } from '../api/product';
// import { useNavigate } from 'react-router-dom';
import { validateProduct, validateProducts } from '../utils/validate'
const CreateSales = () => {
    const { back } = useContext(Context)
    const [products, setProducts] = useState([]);
    //Adding Another Sales Details
    const [addSales, setAddSales] = useState(1);

    //Array to Store The Sold Products Details
    const [productDetails, setProductDetails] = useState([]);

    //Store The Seller Name
    const [sellerName, setSellerName] = useState('');

    const [error, setError] = useState('')

    const [loading, setLoading] = useState(false);



    const handleseller = (e) => {
        setSellerName(e.target.value);
    };

    const handleInput = (index, key, value) => {
        const details = [...productDetails];
        if (!details[index]) {
            //Array Of Product Detail
            details.push({});
        }
        details[index][key] = value;
        setProductDetails(details);

    };

    const add = () => {
        const isError = validateProduct(productDetails[addSales-1])
        if(isError){
            return setError("All Product Fields Are Required...!")
        }
        setAddSales(addSales + 1);
    };

    //Halndles Submit Event
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const isError = validateProducts(productDetails,sellerName)
            if(isError){
               return setError("All Fields Are Must Required...!")
            }
            await createSales({ products: productDetails, seller: sellerName }, products)
            back();
        }
        catch (err) {
            setError(err.response.datamessage)
        }
        finally {
                setLoading(false);
        }
    };

    //FETCH PRODUCTS NAME & ID
    useEffect(() => {
        async function api() {
            const products = await fetchProductsForOptions();
            setProducts(products)

        } api();
    }, [])

    return (
        <>
            <div className='flex mt-5'>

                <form onSubmit={handleSubmit} className='w-full mt-5 mx-1 border border-black rounded  md:w-3/4 lg:w-1/2 md:mx-auto  p-1 md:p-5'>

                    <div>
                        {/*This handles Multiple Purchase Record */}
                        {[...Array(addSales)].map((_, index) => (
                            <div key={index} className='flex justify-between mt-2'>
                                <div className='w-1/3 p-1 md:w-1/4 flex  text-sm '>
                                    <select
                                        label='Product Name'
                                        className='h-8  w-full my-auto rounded border border-black bg-transparent'
                                        onChange={(e) => handleInput(index, 'productId', e.target.value)}
                                    >
                                        <option className='text-black bg-white' value='null'>Select Product</option>
                                        {
                                            products.map(product => {
                                                return (
                                                    <option key={product.productId} className='text-black bg-white' value={product.productId}>{product.name}</option>
                                                )
                                            })
                                        }
                                    </select>

                                </div>
                                <div className='w-1/3 p-1 md:w-1/4 flex'>
                                    <input
                                        type="number"
                                        className='h-8  placeholder:pl-3 border w-full my-auto rounded border-black'
                                        placeholder='Quantity'
                                        onChange={(e) => handleInput(index, 'quantity', e.target.value)}
                                    />
                                </div>
                                <div className='w-1/3 p-1 md:w-1/4 flex'>
                                    <input
                                        type="number"
                                        className='h-8 placeholder:pl-3 border w-full my-auto rounded border-black'
                                        placeholder='Price'
                                        onChange={(e) => handleInput(index, 'price', e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='mt-5'>
                        <button onClick={add} type='button' className='flex hover:text-green-400'>
                            <CiSquarePlus size={40} />
                            <h1 className='my-auto text-2xl'>ADD</h1>
                        </button>
                    </div>
                    <div className='flex flex-col mt-5'>
                        <input
                            type="text"
                            className= 'h-8 mx-auto border border-black w-3/4 md:w-1/2 my-auto rounded '
                            placeholder=' Name Of Buyer'
                            value={sellerName}
                            onChange={handleseller}
                        />
                        {error && <p className='text-sm mx-auto text-red-400 mt-5'>* {error} !</p>}
                    </div>
                    <div className='mt-5 flex justify-between mx-auto md:w-1/3'>
                        <button disabled={loading} type='submit' className=' bg-green-500 text-white font-thin mx-auto py-1 px-2 rounded '>
                            {loading ? 'loading...':'Submit'}
                        </button>
                        <button onClick={back} type='button' className='bg-green-500 text-white font-thin mx-auto py-1 px-2 rounded'>
                            BACK
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateSales