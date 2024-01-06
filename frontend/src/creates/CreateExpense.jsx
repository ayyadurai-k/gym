import React, { useContext, useState } from 'react';
import { Context } from '../context/Context';
import { createExpence } from '../api/expence';

const CreateExpense = () => {
    const { back } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [expenceDetails, setExpenceDetails] = useState({
        title: '',
        price: '',
        who: ''
    });
    const [error, setError] = useState(null);

    const handleInput = (key, value) => {
        setExpenceDetails({ ...expenceDetails, [key]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate form fields

        const isError = validateForm(expenceDetails);
        if (isError) {
            return setError("All Fields Are Must Required....!")
        }
        try {
            setLoading(true);
            await createExpence(expenceDetails);
            back();
        }
        catch (err) {
            setError(err.response.data.message)
        }
        finally {
            setLoading(false)
        }
    };

    const validateForm = (data) => {
        let error = false;

        if (!data.title.trim()) {
            error = true
        }

        if (!data.price) {
            error = true
        }

        if (!data.who.trim()) {
            error = true
        }
        return error;
    };

    return (
        <>
            <div className='flex mt-5 '>
                <form onSubmit={handleSubmit} className="flex flex-col lg:mx-auto mt-10 border-2  border-black px-2 p-5 w-full lg:w-1/3 rounded-xl ">
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <input
                                type="text"
                                className="border placeholder:text-gray-700 border-black w-full  placeholder:pl-3 px-2 py-1 text-sm rounded-md placeholder:text-lg placeholder:my-auto"
                                placeholder="Title"
                                onChange={(e) => handleInput('title', e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                className="w-full border placeholder:text-gray-700  border-black placeholder:pl-3 px-2 py-1  text-sm rounded-md placeholder:text-lg placeholder:my-auto"
                                placeholder="Price"
                                onChange={(e) => handleInput('price', e.target.value)}
                            />
                        </div>

                    </div>

                    <div>
                        <input
                            type="text"
                            className="w-full border border-black placeholder:text-gray-700  placeholder:pl-3 px-2 py-1 mt-3  text-sm rounded-md placeholder:text-lg placeholder:my-auto"
                            placeholder="Who"
                            onChange={(e) => handleInput('who', e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <div className='mt-5 flex justify-between mx-auto md:w-1/3'>
                        <button disabled={loading} type='submit' className='bg-green-400 text-white font-semibold mx-auto py-1 px-2 rounded '>
                            {loading ? 'loading...' : 'Submit'}
                        </button>
                        <button onClick={back} type='button' className='bg-green-400 text-white font-semibold mx-auto py-1 px-2 rounded '>
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateExpense