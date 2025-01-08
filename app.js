import express from "express"
import dotenv from "dotenv"
import connectDb from "./db/connectDb.js"

dotenv.config()

const app =  express()

connectDb()

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is listening at port localhost:${PORT}`)
})