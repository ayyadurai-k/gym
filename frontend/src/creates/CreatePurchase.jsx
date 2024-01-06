import React, { useContext, useEffect, useState } from 'react'
import { CiSquarePlus } from 'react-icons/ci';
import { Context } from '../context/Context';
import { createPurchase } from '../api/purchase';
import { fetchProductsForOptions } from '../api/product';
import { validateProduct, validateProducts } from '../utils/validate';
// import { useNavigate } from 'react-router-dom';

const CreateSales = () => {
    const { back } = useContext(Context)
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('')
    const [addPurchase, setAddPurchase] = useState(1); // SWITCH BETWEEN TABLE AND FORM
    const [productDetails, setProductDetails] = useState([]);
    const [buyerName, setbuyerName] = useState('');
    const [loading, setLoading] = useState(false);


    const handlebuyer = (e) => {
        setbuyerName(e.target.value);
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
        const isError = validateProduct(productDetails[addPurchase - 1])
        if (isError) {
            return setError("All Product Fields Are Required...!")
        }
        setAddPurchase(addPurchase + 1);
    };

    //Halndles Submit Event
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const isError = validateProducts(productDetails, buyerName)
            if (isError) {
                return setError("All Fields Are Must Required...!")
            }
            await createPurchase({ products: productDetails, buyer: buyerName }, products)
            back();
        }
        catch (err) {
            setError(err)
        }
        finally {
            setTimeout(() => {
                setLoading(false);
            }, 3000);
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

                <form onSubmit={handleSubmit} className='w-full mx-1 border border-black md:w-3/4 lg:w-1/2 md:mx-auto bg-white bg-opacity-20 text-white backdrop-filter backdrop-blur-sm rounded-lg mt-5 p-1 md:p-5'>

                    <div>
                        {/*This handles Multiple Purchase Record */}
                        {[...Array(addPurchase)].map((_, index) => (
                            <div key={index} className='flex justify-between mt-2'>
                                <div className='w-1/3 p-1 md:w-1/4 flex  text-sm '>
                                    <select
                                        label='Product Name'
                                        className='h-8 w-full my-auto rounded border border-black text-black '
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
                                        className='h-8 text-black placeholder:pl-3 border w-full my-auto rounded border-black'
                                        placeholder='Quantity'
                                        onChange={(e) => handleInput(index, 'quantity', e.target.value)}
                                    />
                                </div>
                                <div className='w-1/3 p-1 md:w-1/4 flex'>
                                    <input
                                        type="number"
                                        className='h-8 text-black  placeholder:pl-3 border w-full my-auto rounded border-black'
                                        placeholder='Price'
                                        onChange={(e) => handleInput(index, 'price', e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='mt-5'>
                        <button onClick={add} type='button' className='flex text-black hover:text-green-400'>
                            <CiSquarePlus size={40} />
                            <h1 className='my-auto text-2xl'>ADD</h1>
                        </button>
                    </div>
                    <div className='flex flex-col mt-5'>
                        <input
                            type="text"
                            className={error ? 'h-8 mx-auto border text-black  w-3/4 md:w-1/2 my-auto rounded border-red-400' : 'h-8 mx-auto border border-black text-black w-3/4 md:w-1/2 my-auto rounded '}
                            placeholder=' Name Of Buyer'
                            value={buyerName}
                            onChange={handlebuyer}
                        />
                        {error && <p className='text-sm mx-auto text-red-600'>* {error} !</p>}
                    </div>
                    <div className='mt-5 flex justify-between mx-auto md:w-1/3'>
                        <button disabled={loading} type='submit' className='bg-green-500 font-thin mx-auto py-1 px-2 rounded '>
                            {loading ? 'loading...' : 'Submit'}
                        </button>
                        <button onClick={back} type='button' className='bg-green-500 font-thin mx-auto py-1 px-2 rounded '>
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateSales