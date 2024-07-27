import connectDB from "../DB/connection.js"
import authRouter from './modules/auth/auth.router.js'
import userRouter from './modules/user/user.router.js'
import destinationRouter from './modules/destination/destination.router.js'  
import countryRouter from './modules/country/country.router.js'
import couponRouter from './modules/coupon/coupon.router.js'
export const initApp = (app,express)=>{
    app.use(express.json())
    connectDB();

 
    app.use('/auth',authRouter)
    app.use('/user',userRouter)
    app.use('/country',countryRouter)
    app.use('/destination',destinationRouter)
    app.use('/coupon',couponRouter)

    app.use('/',(req,res)=>{
        return res.json({message : 'Welcome To HolidayHive Project'})
    })
    
    // app.use('/',(req,res)=>{
    //     return res.json({message : "done"})
    // })

}