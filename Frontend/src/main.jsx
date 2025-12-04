import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './Components/Main/Home.jsx'
import Register from './Components/Auth/Register.jsx'
import Login from './Components/Auth/Login.jsx'
import Tasks from './Components/Tasks/Tasks.jsx'
import AddTask from './Components/Tasks/AddTask.jsx'
import EditTask from './Components/Tasks/EditTask.jsx'
import Notes from './Components/Notes/Notes.jsx'
import AddNotes from './Components/Notes/AddNotes.jsx'
import SingleNote from './Components/Notes/SingleNote.jsx'
import EditNotes from './Components/Notes/EditNotes.jsx'
import BookMark from './Components/BookMark/BookMark.jsx'
import AddBookMark from './Components/BookMark/AddBookMark.jsx'
import EditBookMark from './Components/BookMark/EditBookMark.jsx'
import SingleBookMark from './Components/BookMark/SingleBookMark.jsx'
import Finance from './Components/Finance/Finance.jsx'
import AddFinance from './Components/Finance/AddFinance.jsx'
import EditFinance from './Components/Finance/EditFinance.jsx'
import SingleFinance from './Components/Finance/SingleFinance.jsx'












const router=createBrowserRouter([{
  
  path:"/",
  element:<App/>,
  children:[
    {
      path:"/",
      element:<Register/>
    },
  {
    path:'/home',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/task',
    element:<Tasks/>
  },
  {
    path:'/addtask',
    element:<AddTask/>
  },
  {
    path:'/edittask/:id',
    element:<EditTask/>
  },
  {
    path:'/notes',
    element:<Notes/>
  },
  {
    path:'/addnotes',
    element:<AddNotes/>
  },
  {
    path:'/singlenote/:id',
    element:<SingleNote/>
  },
  {
    path:'/editnote/:id',
    element:<EditNotes/>
  },
  {
    path:"/bookmark",
    element:<BookMark/>
  },
  {
    path:'/addbookmark',
    element:<AddBookMark/>
  },
  {
    path:"/editbookmark/:id",
    element:<EditBookMark/>
  },
  {
    path:'/singlebookmark/:id',
    element:<SingleBookMark/>
  },
  {
    path:'/finance',
    element:<Finance/>
  },
  {
    path:"/addfinance",
    element:<AddFinance/>
  },
  {
    path:'/editfinance/:id',
    element:<EditFinance/>
  },
  {
    path:"/singlefinance/:id",
    element:<SingleFinance/>
  }

]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
