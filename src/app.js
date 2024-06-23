import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import productRoute from './routes/product.routes.js'
import productRequestRoute from './routes/request.routes.js'
import RequestMessagesRoute from './routes/messages.routes.js'
import cartsRoute from './routes/cart.routes.js'
import orderRoute from './routes/order.routes.js'


// //routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/product", productRoute)
app.use("/api/v1/requests", productRequestRoute)
app.use("/api/v1/messages", RequestMessagesRoute)
app.use("/api/v1/cart", cartsRoute)
app.use("/api/v1/order", orderRoute)



export { app }