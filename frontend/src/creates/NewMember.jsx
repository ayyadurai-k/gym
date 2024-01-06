import React, { useContext, useState } from 'react';
import { Context } from '../context/Context';
import { createMember } from '../api/member';

const NewMember = () => {
    const { back } = useContext(Context);
    const [memberDetails, setMemberDetails] = useState({
        memberId: '',
        gender: '',
        name: '',
        phone: '',
        DOB: '',
        City: '',
        Mail_ID: '',
        requirement: '',
        Address: ''
    });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);
    const [dateInput, setDateInput] = useState({
        date: '',
        month: '',
        year: ''
    })

    const handleInput = (key, value) => {
        setMemberDetails({ ...memberDetails, [key]: value });
        // Clear previous error message when the user starts typing again
        setErrors({ ...errors, [key]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        const isError = validateForm(memberDetails);
        if (isError) {
            return setError("Enter Correct Details")
        }
        // If validation passes, submit the form
        setError(null)
        try {
            setLoading(true);
            await createMember({ ...memberDetails, ...dateInput });
            back()
        }
        catch (error) {
            setError(error.response.data.message)
        }
        finally {
            setLoading(false)
        }

    };

    const validateForm = (data) => {
        let error = false;

        if (!data.memberId.trim()) {
            error = true
        }

        if (!data.gender || data.gender === "null") {
            error = true
        }

        if (!data.name.trim()) {
            error = true
        }

        if (!data.phone.trim()) {
            error = true
        } else if (!/^\d+$/.test(data.phone)) {
            error = true
        }

        if (!data.DOB) {
            error = true
        }

        if (!data.City.trim()) {
            error = true
        }

        if (!data.Mail_ID.trim()) {
            error = true
        } else if (!/\S+@\S+\.\S+/.test(data.Mail_ID)) {
            error = true
        }

        if (!data.requirement || data.requirement === "null") {
            error = true
        }
        if (!dateInput.date) error = true
        if (!dateInput.month) error = true
        if (!dateInput.year) error = true
       
        return error;
    };

    const handleDateInput = (e) => {
        const { name, value } = e.target;
        setDateInput((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    return (
        <>
            <div className='flex mt-5'>
                <form className="flex flex-col lg:mx-auto mt-10 border-2 bg-teal-300 px-2 p-5 w-full lg:w-1/2 rounded-xl ">
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <input
                                type="number"
                                className="shadow-xl focus:outline-none placeholder:text-gray-700 w-full  placeholder:pl-3 px-2 py-1 text-sm rounded-md placeholder:text-lg placeholder:my-auto"
                                placeholder="Member ID"
                                onChange={(e) => handleInput('memberId', e.target.value)}
                            />
                        </div>
                        <div>
                            <select
                                className="shadow-xl focus:outline-nonek placeholder:text-gray-700 w-full  placeholder:pl-3 px-2 py-1 text-sm rounded-md"
                                onChange={(e) => handleInput('gender', e.target.value)}
                            >
                                <option value="null">- - Gender - -</option>
                                <option value="MALE" className='text-white bg-black'>Male</option>
                                <option value="FEMALE" className='text-white bg-black'>Female</option>
                            </select>
                        </div>
                        <div className="grid mt-3 grid-cols-2 gap-5">
                            <div>
                                <input
                                    type="text"
                                    className="w-full shadow-xl focus:outline-none placeholder:text-gray-700  placeholder:pl-3 px-2 py-1  text-sm rounded-md placeholder:text-lg placeholder:my-auto"
                                    placeholder="Full Name"
                                    onChange={(e) => handleInput('name', e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    className=" w-full shadow-xl focus:outline-none placeholder:text-gray-700  placeholder:pl-3 px-2 py-1 text-sm  rounded-md placeholder:text-lg placeholder:my-auto"
                                    placeholder="phone Number"
                                    onChange={(e) => handleInput('phone', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className='flex flex-col'>
                                <div className='w-full flex justify-between px-1 mt-3 rounded-md'>
                                    <label htmlFor="" className='text-black my-auto'>D.O.B <span className='font-bold'>:</span> </label>
                                    <input
                                        type="date"
                                        className="shadow-xl focus:outline-none placeholder:text-gray-700  placeholder:pl-3 w-5/6 px-2 py-1  text-sm  rounded-md placeholder:text-lg placeholder:my-auto"
                                        placeholder="DOB"
                                        onChange={(e) => handleInput('DOB', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    className="w-full shadow-xl focus:outline-none placeholder:text-gray-700 placeholder:pl-3 px-2 py-1 mt-3  text-sm rounded-md placeholder:text-lg placeholder:my-auto"
                                    placeholder="City"
                                    onChange={(e) => handleInput('City', e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="mail"
                                    className="w-full shadow-xl focus:outline-none placeholder:text-gray-700 placeholder:pl-3 px-2 py-1  text-sm  rounded-md placeholder:text-lg placeholder:my-auto"
                                    placeholder="Mail ID"
                                    onChange={(e) => handleInput('Mail_ID', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className='font-bold'>DOJ</label>
                                <input
                                    type="text"
                                    className="w-full m-1 shadow-xl focus:outline-none placeholder:text-gray-700  placeholder:pl-3 px-2 py-1  text-sm  rounded-md placeholder:text-lg placeholder:my-auto"
                                    placeholder="Date"
                                    onChange={handleDateInput}
                                    value={dateInput.date}
                                    name='date'
                                />
                                <input
                                    type="text"
                                    className="w-full m-1 shadow-xl focus:outline-none placeholder:text-gray-700  placeholder:pl-3 px-2 py-1  text-sm  rounded-md placeholder:text-lg placeholder:my-auto"
                                    placeholder="Month"
                                    onChange={handleDateInput}
                                    value={dateInput.month}
                                    name='month'
                                />
                                <input
                                    type="text"
                                    className="w-full m-1 shadow-xl focus:outline-none placeholder:text-gray-700  placeholder:pl-3 px-2 py-1  text-sm  rounded-md placeholder:text-lg placeholder:my-auto"
                                    placeholder="Year"
                                    onChange={handleDateInput}
                                    value={dateInput.year}
                                    name='year'
                                />
                            </div>
                            <div><select
                                label=""
                                className="w-full shadow-xl focus:outline-none placeholder:text-gray-700 placeholder:pl-3 px-2 py-1  text-sm  rounded-md"
                                onChange={(e) => handleInput('requirement', e.target.value)}

                            >
                                <option value="null" className=''>- - Requirement - -</option>
                                <option value="monthly" className='text-black bg-white' >Monthly</option>
                                <option value="half-yearly" className='text-black bg-white' >Half-Yearly</option>
                                <option value="yearly" className='text-black bg-white' >Yearly</option>
                            </select>
                            </div>
                        </div>
                        {error && <div className=''>
                            <p className='text-black font-bold'>{error}...!</p>
                        </div>}
                        <div className='mt-5 flex justify-between mx-auto md:w-1/3'>
                            <button onClick={handleSubmit} disabled={loading} type='submit' className='bg-white text-black font-bold mr-2  mx-auto py-1 px-2 rounded '>
                                {loading ? '....' : "Submit"}
                            </button>
                            <button onClick={back} type='button' className='bg-white ml-2 text-black font-bold  mx-auto py-1 px-2 rounded '>
                                Back
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default NewMember;
