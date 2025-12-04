import express from 'express'
import connectDatabase from './Config/db.js'
import dotenv from 'dotenv'
import AuthRoutes from './Routes/Auth.Route.js'
import TaskRoutes from './Routes/Task.Route.js'
import NoteRoutes from './Routes/Notes.Route.js'
import BookMarkRoutes from './Routes/BookMark.Route.js'
import FinanceRoutes from './Routes/Finance.Route.js'
import cors from 'cors'




// Load environment variables FIRST
dotenv.config()

// Connect to database
connectDatabase()

const app = express()
const port = process.env.PORT || 5000

// Middleware - MUST come before routes
app.use(cors())
app.use(express.json())

// API Routes - MUST come before static files
app.use('/api/auth', AuthRoutes)
app.use('/api/tasks', TaskRoutes)
app.use('/api/notes', NoteRoutes)
app.use('/api/bookmark', BookMarkRoutes)
app.use('/api/finance', FinanceRoutes)



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})