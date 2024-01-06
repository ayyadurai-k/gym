import { useContext } from 'react';
import Menubar from './menu/Menubar';
import CreatePurchase from '../creates/CreatePurchase'
import { Context } from '../context/Context';
import PurchaseTable from '../tables/PurchaseTable';
import { FaPenToSquare } from 'react-icons/fa6';

const Purchase = () => {

    const { createP, createpurchase } = useContext(Context);

    return (
        <>
            <Menubar />
            <div className='h-[100px] flex bg-blue-500'>
                <p className='mx-auto text-white font-semibold text-5xl my-auto'>PURCHASE</p>
            </div>
            <div className='h-[60px] md:h-[50px]  flex justify-end px-1 border-b border-black  md:px-3'>
                <button type='button' onClick={createP} className='border bg-green-500 px-2 h-10 my-auto rounded text-white font-semibold flex'><FaPenToSquare className='my-auto' size={20} /><span className='my-auto pl-2'>Create Purchase</span></button>

            </div>

            {createpurchase ? <CreatePurchase /> : <PurchaseTable />}
        </>
    );
};
    export default Purchase
