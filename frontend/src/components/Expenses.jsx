import React, { useContext } from 'react'
import Menubar from './menu/Menubar'
import { FaPenToSquare } from "react-icons/fa6";
import { Context } from '../context/Context';
import CreateExpense from '../creates/CreateExpense';
import ExpenceList from '../tables/ExpenceList';

const Expenses = () => {
  const { newexpence, newExpence } = useContext(Context)
  return (
    <>
      <Menubar />
      <div className='h-[100px] flex bg-blue-500'>
        <p className='mx-auto text-white font-semibold text-5xl my-auto'>EXPENSES</p>
      </div>
      <div className='h-[60px] md:h-[50px]  flex justify-end px-1 md:px-3'>
        <button onClick={newexpence} type='button' className='border bg-green-500 px-2 h-10 my-auto rounded text-white font-semibold flex'><FaPenToSquare className='my-auto' size={20} /><span className='my-auto px-1'>Add Expense</span></button>
      </div>
      {newExpence ? <CreateExpense /> : <ExpenceList />}
    </>
  )
}

export default Expenses