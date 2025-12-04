import express from 'express'
import connectDatabase from './Config/db.js'
import dotenv from 'dotenv'
import AuthRoutes from './Routes/Auth.Route.js'
import TaskRoutes from './Routes/Task.Route.js'
import NoteRoutes from './Routes/Notes.Route.js'
import BookMarkRoutes from './Routes/BookMark.Route.js'
import FinanceRoutes from './Routes/Finance.Route.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'dist')))

// Handle React routing - THIS MUST BE LAST (catch-all for frontend routes)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})


