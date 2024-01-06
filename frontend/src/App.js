import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Sales from "./components/Sales";
import Purchase from "./components/Purchase";
import Member from "./components/Member";
import Trainer from "./components/Trainer";
import Products from "./components/Products";
import { ContextProvider } from "./context/Context";
import Expenses from "./components/Expenses";
import BranchLogin from "./branches/BranchLogin";
import AdminLogin from './admin/AdminLogin'
import AdminPanel from './admin/AdminPanel'
import ProductList from "./tables/ProductList";
import SendReport from "./components/report/SendReport";
// import Menubar from "./components/Menubar";
// import axios from "axios";

function App() {
  // axios.defaults.baseURL="";
  // axios.defaults.withCredentials=true;
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path='/' element={<BranchLogin />} />
          <Route path='/index' element={<Home />} />
          <Route path='/adminlogin' element={<AdminLogin />} />  
          <Route path='/adminpanel' element={<AdminPanel />} />  
          <Route path='/sales' element={<Sales />} />
          <Route path='/purchase' element={<Purchase />} />
          <Route path='/productlist' element={<ProductList />} />
          <Route path='/member' element={<Member />} />
          <Route path='/trainer' element={<Trainer />} />
          <Route path='/products' element={<Products />} />
          <Route path='/expenses' element={<Expenses />} />
          <Route path='/sendreport' element={<SendReport />} />
        </Routes>
      </ContextProvider>

    </BrowserRouter>
  );
}

export default App;

