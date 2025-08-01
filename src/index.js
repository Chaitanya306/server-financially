
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'


import {login,home} from './routes/routes.js'
import { router } from './controllers/controllers.js'
import connectDB from './db.js'


dotenv.config()
const app=express()
app.use(cors());
app.use(express.json())
app.use(router)
const PORT = process.env.PORT || 5000

app.listen(process.env.PORT,()=>{
  console.log(`server listening at ${process.env.PORT}`)
  connectDB()
})


