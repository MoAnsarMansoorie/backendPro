import express from "express"
import dotenv from "dotenv"
import connectDb from "./db/connectDb.js"
import userRoute from "./routes/user.router.js"

dotenv.config()

const app =  express()

connectDb();

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/v1/user", userRoute)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is listening at port localhost:${PORT}`)
})