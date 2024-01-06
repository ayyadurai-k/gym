import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchLoginBranch } from '../../api/branch';

const Menubar = () => {
  const navigate = useNavigate();
  const [branch,setBranch] = useState('')
  useEffect(() => {
    async function api() {
      try {
        const branchRes =( await fetchLoginBranch()).data.data
        setBranch(branchRes.branchName)
      } catch (error) {
        navigate('/')
      }
    }api()
  },[navigate])
  return (
    <div className='h-[60px] bg-red-300 flex px-5 justify-between items-center'>
      <div className='flex '>
        <p onClick={()=>navigate('/')} className='bg-white font-bold px-2 py-1 cursor-pointer rounded'>
          Back
        </p>
        <Link to='/sales' className='text-white ml-2 font-semibold text-2xl my-auto'>{branch}</Link>
      </div>
      <ul className='flex my-auto'>
        <li className='px-2 text-white font-semibold text-lg'><Link to='/sales'>Sales</Link></li>
        <li className='px-2 text-white font-semibold text-lg'><Link to='/purchase'>Purchase</Link></li>
        <li className='px-2 text-white font-semibold text-lg'><Link to='/member'>Members</Link></li>
        <li className='px-2 text-white font-semibold text-lg'><Link to='/expenses'>Expenses</Link></li>
        <li className='px-2 text-white font-semibold text-lg'><Link to='/productlist'>Products</Link></li>
        {/* <li className='px-2 text-white font-semibold text-lg'><Link to='/Trainer'>Trainers</Link></li> */}
        <li className='px-2 text-white bg-green-400 rounded font-semibold text-lg'><button onClick={() => navigate('/sendreport')} type='button'>Send Report</button></li>
      </ul>
    </div>
  )
}

export default Menubar