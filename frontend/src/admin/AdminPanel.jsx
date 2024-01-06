import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsBuildingAdd } from "react-icons/bs";
import { createBranch, loginBranch } from '../api/branch';
import { RiAdminLine } from "react-icons/ri";
import { getAdminPanel, logoutAdmin } from '../api/admin.js'


const AdminPanel = () => {
    const initialInput = {
        branchName: '',
        branchId: '',
        branchPassword: '',
        address: ''
    }
    const [input, setInput] = useState(initialInput)
    const navigate = useNavigate()
    const [newbranch, setNewbranch] = useState(false)
    const [adminLoading, setAdminLoading] = useState(false)
    const [admin, setAdmin] = useState(null)
    const [error, setError] = useState(null)
    const [createError, setCreateError] = useState(null)
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('')
    const addbranch = () => {
        setNewbranch(true);
    }

    const handleSubmit = async (branchId, password) => {
        setLoading(true);
        try {
            await loginBranch({ branchId, password });
            navigate('/index');
        } catch (err) {
            setError(err.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const [branch, setBranch] = useState([])
    useEffect(() => {
        async function api() {
            try {
                setAdminLoading(true)
                const res = await getAdminPanel();
                const { admin: adminRes, branches } = res.data.data;
                setBranch(branches)
                setAdmin(adminRes)
            }
            catch (error) {
                navigate('/adminlogin')
            }
            finally {
                setAdminLoading(false)
            }
        }
        api();
    }, [navigate]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput(prev => {
            return {
                ...prev,
                [name]: value
            }
        })

    }

    const handleCreateBranch = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const branch = (await createBranch(input)).data.data;
            setBranch(prev => {
                return [
                    ...prev,
                    branch
                ]
            })
            window.scrollTo(0, 0)
            setNewbranch(false)
        }
        catch (error) {
            setCreateError(error.response.data.message)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div >
            {!adminLoading && admin && branch.length > 0 && <div className='flex flex-col bg-amber-300  h-full'>
                <div className='text-white flex justify-between items-center w-full'>
                    <div className='flex  ml-2'>
                        <button onClick={()=>navigate('/')} className='border mx-1 bg-white text-black px-2 py-1 text-xl my-5 *.369 rounded font-semibold'>Back</button>
                        <p className='flex border bg-white text-black mx-1 px-2 py-1 text-xl my-5 *.369 rounded font-semibold'><RiAdminLine size={25} className='mr-2' />{admin.name}</p>
                    </div>
                    <h1 className='text-black text-4xl font-body  font-bold'>Admin Panel</h1>
                    <button onClick={async () => { await logoutAdmin(); navigate('/adminlogin') }} className='border px-2 py-1 rounded-xl text-xl my-5 bg-red-400 text-black  mx-20 font-semibold'>Logout</button>
                </div>
                <div className={newbranch ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-10 lg:my-20 xl:my-32 mx-auto w-3/4  gap-5' : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-10 lg:my-20 xl:my-32 w-3/4 mx-auto gap-5'}>

                    {branch.map((branch) => (
                        <form key={branch.branchId} className='shadow-xl w-3/4 h-[300px] mx-auto  bg-white flex flex-col rounded-lg p-2'>
                            <h1 className='mx-auto text-center text-xl lg:text-2xl py-3'>{branch.branchName}</h1>
                            <hr className='border border-black' />

                            <div className='w-3/4 flex flex-col mx-auto my-auto py-3'>
                                <label htmlFor='password' className='font-semibold'>Password</label>
                                <input
                                    type='password'
                                    className='border-b-2 my-auto px-3 mt-5 bg-tra border-black focus:outline-none  placeholder:text-black'
                                    placeholder='Enter Password'
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                            </div>
                            {error && <div>
                                <p className='bg-red-400'>{error}</p>
                            </div>}
                            <div className='w-1/3 flex flex-col mx-auto py-3'>
                                <button disabled={loading} onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmit(branch.branchId, password)
                                }} type='submit' className='bg-amber-500 hover:bg-amber-400 font-bold shadow-xl text-lg border rounded-lg'>
                                    {loading ? "Loading" : "Login"}
                                </button>
                            </div>
                        </form>
                    ))}
                    {admin && <button onClick={addbranch} className='border w-3/4 h-[300px] mx-auto bg-white  flex flex-col rounded-lg p-2'>
                        <div className='mx-auto my-auto text-center'>
                            <BsBuildingAdd size={100} className='mx-auto' />
                            <p className='mx-auto font-semibold mt-5'>Add New Branch</p>
                        </div>
                    </button>}
                    {newbranch && <form className='border w-3/4 h-full mx-auto bg-white text-black flex flex-col rounded-lg p-2'>
                        <div className='w-3/4 flex flex-col mx-auto'>
                            <label htmlFor='branch_details' className='mx-auto text-xl mb-6 font-bold'>New Branch Details</label>
                            <input
                                type='text'
                                className='border-b-2 border-black px-3 mt-3 bg-transparent focus:outline-none placeholder:text-gray-500'
                                placeholder='Branch Name'
                                onChange={handleInput}
                                value={input.branchName}
                                name="branchName"
                            />

                        </div>
                        <div className='w-3/4 flex flex-col mx-auto py-3'>
                            <input
                                type='text'
                                className='border-b-2 border-black my-auto px-3 mt-3 bg-transparent focus:outline-none placeholder:text-gray-500'
                                placeholder='Branch ID'
                                onChange={handleInput}
                                value={input.branchId}
                                name="branchId"
                            />
                        </div>
                        <div className='w-3/4 flex flex-col mx-auto py-3'>
                            <input
                                type='text'
                                className='border-b-2 border-black my-auto px-3 mt-3  bg-transparent focus:outline-none placeholder:text-gray-500'
                                placeholder='Branch Password'
                                onChange={handleInput}
                                value={input.branchPassword}
                                name="branchPassword"
                            />
                        </div>
                        <div className='w-3/4 flex flex-col mx-auto py-3'>
                            <input
                                type='text'
                                className='border-b-2 border-black my-auto px-3 mt-3  bg-transparent focus:outline-none placeholder:text-gray-500'
                                placeholder='Branch Address'
                                onChange={handleInput}
                                value={input.address}
                                name="address"
                            />
                        </div>
                        {createError && <div>
                            <p className='text-red-400 font-bold'>{createError}</p>
                        </div>}
                        <div className='w-1/3 flex flex-col mx-auto py-3'>
                            <button onClick={handleCreateBranch} disabled={loading} type='submit' className='bg-amber-500 hover:bg-amber-400 font-semibold  text-lg border rounded-lg'>
                                {loading ? "..." : "Create "}
                            </button>
                        </div>
                    </form>}
                </div>
            </div>}
            {adminLoading && <div>
                <p>Loading...</p>
            </div>}
        </div>
    );
};

export default AdminPanel;
