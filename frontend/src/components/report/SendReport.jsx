import React, { useState, useEffect } from 'react'
import { MdOutlineArrowBack } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { fetchExpires, fetchReports, sendReportEmail } from '../../api/report'
import { fetchLoginBranch } from '../../api/branch'

const SendReport = () => {
  const navigate = useNavigate()
  const [reports, setReports] = useState(null)
  const [expires, setExpires] = useState([])
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [exLoading, setExLoading] = useState(false)
  useEffect(() => {
    async function api() {
      const res = await fetchReports();
      setExLoading(true)
      const expRes = await fetchExpires();
      setExpires(expRes)
      setReports(res)
      setExLoading(false)
    } api();
  }, [])

  const handleSubmit = async () => {
    try {
      setLoading(true)
      await sendReportEmail({ ...reports, email })
      setMessage("Email Sent Successfully...!")
      setEmail('')
    }
    catch (err) {
      setMessage(err.response.data.message)
    }
    finally {
      setLoading(false)
    }
  }
  const [branch, setBranch] = useState('')
  useEffect(() => {
    async function api() {
      try {
        const branchRes = (await fetchLoginBranch()).data.data
        setBranch(branchRes.branchName)
      } catch (error) {
        console.log(error.message);
      }
    } api()
  }, [])
  return (
    <>
      <div className='h-[60px] bg-red-300 flex px-5 justify-between'>
        <Link to='/index' className='text-white font-semibold text-2xl my-auto'>{branch}</Link>
        <button onClick={() => navigate('/sales')} className='flex text-lg my-auto ml-2 text-white font-bold'>
          <MdOutlineArrowBack className='mx-1 my-auto' size={20} />
          Back
        </button>
      </div>
      <div className='h-[100px] flex bg-blue-500'>
        <p className='mx-auto text-white font-semibold text-5xl my-auto'>SEND REPORT</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 px-2'>
        <div className="container mx-auto rounded-xl mt-8">
          <p className='text-white font-bold text-xl text-center bg-green-400'>Today Reports </p>
          <table className="min-w-full roxl bg-white ">
            <thead>
              <tr className='border'>
                <th className="px-4 border-black py-2 border-r border-l">Title</th>
                <th className="px-4 border-black py-2 border-r border-l">Amount</th>
              </tr>
            </thead>
            {reports && <tbody>

              <tr >
                <td className="border border-black px-4 py-2">Sales</td>
                <td className="border border-black px-4 py-2">{reports.salesAmount}</td>
              </tr>
              <tr >
                <td className="border border-black px-4 py-2">New Joinee Amount</td>
                <td className="border border-black px-4 py-2">{reports.newJoineeAmount}</td>
              </tr>
              <tr >
                <td className="border border-black px-4 py-2">Purchases</td>
                <td className="border border-black px-4 py-2">-{reports.purchaseAmount}</td>
              </tr>
              <tr >
                <td className="border border-black px-4 py-2">Expences</td>
                <td className="border border-black px-4 py-2">-{reports.expencesAmount}</td>
              </tr>
              <tr className="font-semibold">
                <td className="border border-black px-4 py-2">Total</td>
                <td className="border border-black px-4 py-2">₹ {reports.totalAmount}</td>
              </tr>
            </tbody>}
          </table>
        </div>

        <div className="container mx-auto mt-8">
          <p className='text-white font-bold text-xl text-center bg-green-400'>Expires</p>
          <table className="min-w-full bg-white ">
            <thead>
              <tr className="border">
                <th className="px-4 border-black  py-2 border-r border-l">Member ID</th>
                <th className="px-4 border-black  py-2 border-r">Name</th>
                <th className="px-4 border-black  py-2 border-r">DOJ</th>
                <th className="px-4 border-black  py-2 border-r">DOE</th>
                <th className="px-4 border-black  py-2 border-r">Expires IN</th>
              </tr>
            </thead>
            {!exLoading && expires.length > 0 && <tbody>
              {expires.map((member, i) => (
                <tr key={i} className="">
                  <td className="border border-black px-4 py-2">{member.memberId}</td>
                  <td className="border border-black px-4 py-2">{member.name}</td>
                  <td className="border border-black px-4 py-2">{member.DOJ}</td>
                  <td className="border border-black px-4 py-2">{member.DOE}</td>
                  <td className="border border-black px-4 py-2">{member.expiresIn}</td>
                </tr>
              ))}
            </tbody>}
            {exLoading && <tbody>Loading...</tbody>}
            {!exLoading && expires.length === 0 && <tbody className='border w-full flex justify-center'>
              <p className='text-center font-bold mt-5'>No Data Found...!</p>
            </tbody>}
          </table>
        </div>
      </div>
      <div className='flex flex-col mb-5 mt-8 w-3/4 md:w-1/2 mx-auto'>
        {message && <div className='flex justify-center'>
          <p className='text-red-500 font-bold  mt-2 text-center '>{message}</p>
        </div>}
        <div className='flex w-full justify-center'>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="mail" className='px-3 bg-white border border-black rounded-l w-3/4' placeholder='Enter E-Mail' />
          <button disabled={loading} onClick={handleSubmit} className='bg-green-400 text-gray-800 p-2 border border-black rounded-r font-semibold'>{loading ? 'loading...' : 'Send'}</button>
        </div>

      </div>
    </>
  )
}

export default SendReport