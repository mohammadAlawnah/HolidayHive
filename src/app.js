import connectDB from "../DB/connection.js"
import authRouter from './modules/auth/auth.router.js'
import userRouter from './modules/user/user.router.js'
import destinationRouter from './modules/destination/destination.router.js'  
import countryRouter from './modules/country/country.router.js'
import couponRouter from './modules/coupon/coupon.router.js'
import tripRouter from './modules/trip/trip.router.js'
import tripUserRouter from './modules/tripUser/tripUser.router.js'
import cors from 'cors'

export const initApp = (app,express)=>{
    app.use(express.json())
    app.use(cors())
    connectDB();
   
    


    app.use('/auth',authRouter)
    app.use('/user',userRouter)
    app.use('/country',countryRouter)
    app.use('/destination',destinationRouter)
    app.use('/coupon',couponRouter)
    app.use('/trip',tripRouter)
    app.use('/tripUser',tripUserRouter)

    app.use('/',(req,res)=>{
        res.json({message : 'welcome to HolidayHive project'})
    })
    
    app.use('*',(req,res)=>{
        res.status(404).json({message : "page not found"})
    })

    app.use((err,req,res,next)=>{
        res.json({error  : "this error"})

    })

}