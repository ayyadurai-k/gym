import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsBuildingAdd } from "react-icons/bs";
import { fetchBranches, loginBranch } from '../api/branch';


const BranchLogin = () => {

  const navigate = useNavigate()


  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('')
  const [branch, setBranch] = useState([])


  const handleSubmit = async (branchId, password) => {

    try {
      setLoading(true)
      await loginBranch({ branchId, password });
      navigate('/sales')
    } catch (err) {
      setError(err.response.data.message)

    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    async function api() {
      const branches = await fetchBranches();
      setBranch([...branch,...branches])
    }
    api();
  }, []);

  return (
    <div >
      <div className='flex flex-col bg-teal-300  h-full'>
        <div className='text-white flex justify-end w-full'>
          <button onClick={() => navigate('/adminpanel')} className=' bg-white px-2 text-xl my-50 text-black mt-2 shadow-xl rounded mx-20 font-semibold capitalize'>admin panel</button>
        </div>
        <h1 className='text-black text-4xl text-center font-body  font-bold'>Branches</h1>
        <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-10 lg:my-20 xl:my-32 mx-auto w-3/4  gap-5'}>
          {branch.map((branch, index) => (
            <form key={index} className='shadow-xl w-3/4 h-[300px] mx-auto  bg-white flex flex-col rounded-lg p-2'>
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
                <p key={index} className='text-red-400 font-bold'>{error}</p>
              </div>}
              <div className='w-1/3 flex flex-col mx-auto py-3'>
                <button key={index} disabled={loading} onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(branch.branchId, password)
                }} type='submit' className='bg-teal-500 hover:bg-teal-400 font-bold shadow-xl text-lg border rounded-lg'>
                  {loading ? "Loading" : "Login"}
                </button>
              </div>
            </form>
          ))}
          <button disabled className='border w-3/4 h-[300px] mx-auto bg-white bg-opacity-10   text-white backdrop-filter backdrop-blur-sm border-white flex flex-col rounded-lg p-2'>
            <div className='mx-auto my-auto text-center'>
              <BsBuildingAdd size={100} className='mx-auto' />
              <p className='mx-auto font-semibold mt-5'>NEW BRANCH</p>
              <p className='mx-auto font-semibold'>WILL APPEAR HERE</p>
            </div>
          </button>

        </div>
      </div>
    </div>
  );
};

export default BranchLogin;
