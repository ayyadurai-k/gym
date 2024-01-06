import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDatabase from './config/connectDatabase.js';
import error from './middlewares/error.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import branchRoute from './routes/branchRoute.js';
import adminRoute from './routes/adminRoute.js';
import memberRoute from './routes/memberRoute.js';
import trainerRoute from './routes/trainerRoute.js';
import productRoute from './routes/productRoute.js';
import purchaseRoute from './routes/purchaseRoute.js';
import salesRoute from './routes/salesRoute.js';
import expenceRoute from './routes/expenceRoute.js';
import reportRoute from './routes/reportRoute.js';
import { log } from 'console';

const app = express();


// CONFIGURATION


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//app.use(express.static(path.join(__dirname, 'public')))
dotenv.config()
app.use(morgan('dev'))
dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: true}))



//CONNECT DATABASE
connectDatabase();

//CONTROLLERS
app.use('/api/v1/admin',adminRoute)
app.use('/api/v1/branch',branchRoute)
app.use('/api/v1/member',memberRoute)
app.use('/api/v1/trainer',trainerRoute)
app.use('/api/v1/product',productRoute)
app.use('/api/v1/purchase',purchaseRoute)
app.use('/api/v1/sales',salesRoute)
app.use('/api/v1/expence',expenceRoute)

app.use('/api/v1/report',reportRoute)

console.log(process.env.ENVIROMENT);

//CONNECT FRONTEND AND BACKEND USING STATIC FILES
if(process.env.ENVIROMENT==="production"){
    console.log(path.join(__dirname,'..','frontend','build'));
    app.use(express.static(path.join(__dirname,'..','frontend','build')));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'..','frontend','build','index.html'));
    })
}


//ERROR
app.use(error)

//PORT
const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log(`App Litening ${PORT} Port at ${process.env.ENVIROMENT} ...`);
})