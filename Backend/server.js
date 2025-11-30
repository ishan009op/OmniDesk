import express from 'express'
import  connectDatabase  from './Config/db.js'
import dotenv from 'dotenv'
import AuthRoutes from './Routes/Auth.Route.js'
import TaskRoutes from './Routes/Task.Route.js'
import NoteRoutes from './Routes/Notes.Route.js'
import BookMarkRoutes from './Routes/BookMark.Route.js'
import FinanceRoutes from './Routes/Finance.Route.js'
import cors from 'cors'
connectDatabase()
dotenv.config()
const corsOptions = {
  origin: 'https://omnidesk-frontend.onrender.com', // Allow only this origin
  methods: ['GET', 'POST','PUT','PATCH','DELETE'], // Allow only GET and POST requests
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true // Allow sending cookies/credentials
};
const app=express()
const port=process.env.PORT

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/auth',AuthRoutes)
app.use('/api/tasks',TaskRoutes)
app.use('/api/notes',NoteRoutes)
app.use('/api/bookmark',BookMarkRoutes)
app.use('/api/finance',FinanceRoutes)

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})