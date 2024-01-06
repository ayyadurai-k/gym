import React, { useContext } from 'react';
import Menubar from './menu/Menubar';
import CreateSales from '../creates/CreateSales';
import SalesTable from '../tables/SalesTable';
import { Context } from '../context/Context';
import { FaPenToSquare } from 'react-icons/fa6';


const Sales = () => {
   
    const {createS,createsales}=useContext(Context)
   
    

    return (
        <>
            <Menubar />
            <div className='h-[100px] flex bg-blue-500'>
                <p className='mx-auto text-white font-semibold text-5xl my-auto'>SALES</p>
            </div>
            <div className='h-[60px] md:h-[50px]  flex justify-end px-1 border-b border-black md:px-3'>
                <button type='button' onClick={createS} className='border bg-green-500 px-2 h-10 my-auto rounded text-white font-semibold flex'><FaPenToSquare className='my-auto' size={20} /><span className='my-auto pl-2'>Create Sales</span></button>

            </div>

            {createsales?<CreateSales/>:<SalesTable/>}

            

        </>
    );
};
                export default Sales;
