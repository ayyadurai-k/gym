import React, { useEffect, useState } from 'react';
import { MdOutlineArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getAdminPanel, loginAdmin } from '../api/admin';
// import { loginAdmin } from '../api/admin';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [adminLoading, setAdminLoading] = useState(false)
  const [error, setError] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Basic validation - check if username and password are filled
    if (!username.trim()) {
      setErrors({ username: 'Username is required' });
      return;
    }
    if (!password.trim()) {
      setErrors({ password: 'Password is required' });
      return;
    }
    try {
      await loginAdmin({ username, password })
      navigate('/adminpanel')
    }
    catch (err) {
      setError(err.response.data.message)
    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    async function api() {
      try {
        setAdminLoading(true)
        await getAdminPanel();
        navigate('/adminpanel')

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

  return (
    <>
      <div className='flex bg-gray-600 font-bold h-screen'>
        {!adminLoading && <div className='w-3/4 md:w-1/2 xl:w-1/3 mx-auto my-auto text-white'>
          <button onClick={() => navigate('/')} className='flex text-lg'>
            <MdOutlineArrowBack className='mx-1 my-auto' size={20} />
            Back
          </button>
          <form onSubmit={handleSubmit} className='border bg-white bg-opacity-10 text-white backdrop-filter backdrop-blur-sm border-white flex flex-col rounded-lg p-2'>
            <h1 className='mx-auto text-xl lg:text-2xl py-3'>Admin Login</h1>
            <hr />
            <div className='w-3/4 flex flex-col mx-auto mt-2 py-3'>
              <label htmlFor='username' className='font-semibold'>Username</label>
              <input
                type='text'
                className='border-b-2 my-auto px-3 focus:outline-none bg-transparent placeholder:text-white  mt-3'
                placeholder='Enter Username'
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors({ ...errors, username: '' });
                }}
              />
              {errors.username && <span className='text-white'>* {errors.username} !</span>}
            </div>
            <div className='w-3/4 flex flex-col mx-auto py-3'>
              <label htmlFor='password' className='font-semibold'>Password</label>
              <input
                type='password'
                className='border-b-2 my-auto px-3 focus:outline-none bg-transparent placeholder:text-white  mt-3'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: '' });
                }}
              />
              {errors.password && <span className='text-white px-2'>* {errors.password} !</span>}
            </div>
            {error && <div>
              <p className='bg-red-400 mt-2'>{error}</p>
            </div>}
            <div className='w-1/3 flex flex-col mx-auto py-3'>
              <button disabled={loading} type='submit' className='border rounded-lg bg-white bg-opacity-10 hover:bg-opacity-50 hover:text-black text-white backdrop-filter backdrop-blur-sm border-white font-semibold text-lg'>
                {loading ? 'loading...' : "Login"}
              </button>
            </div>
          </form>
        </div>}
        {adminLoading && <div>
          <p>
            Loading...
          </p>
        </div>}
      </div >
    </>
  );
};

export default AdminLogin;
