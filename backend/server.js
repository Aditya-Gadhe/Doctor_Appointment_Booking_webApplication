import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

//app config
const app = express()
const port = process.env.PORT || 4000 
connectDB()
connectCloudinary()

//middlewares
app.use(express.json()) //whenwver we make any req the req will parse through this fun
app.use(cors()) //allow frontemd to connect with backend

//api endpoint
app.use('/api/admin',adminRouter)  // localhost:4000/api/admin/
app.use('/api/doctor',doctorRouter) //localhost:4000/api/doctor/
app.use('/api/user',userRouter) //localhost:4000/api/user/


app.get('/',(req,res)=>{
    res.send("api working")
})

app.listen(port,()=>{
    console.log("server is listinig on ",port)
})