import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const SingleNote = () => {
  const token = localStorage.getItem('omniToken')
  const [note, setNote] = useState()
  const { id } = useParams()
const navigate=useNavigate()
  // Fetch single note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/notes/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setNote(res.data)
      } catch (err) {
        console.error(err)
        alert('Failed to fetch note')
      }
    }
    
    fetchNote()
  }, [id, token])
  
  
  //Delete Notes 
  
  const DeleteNotes=async()=>{
const confirm = window.confirm("Are you sure you want to delete!")
    if (!confirm) return;

    const res = await axios.delete(`http://localhost:3000/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
console.log(res.data)
alert("note deleted successfully")
navigate('/notes')

  }



  // Toggle pin/unpin
  const togglePinned = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/notes/${id}`,
        { pinned: !note.pinned },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setNote(res.data) // update local state
    } catch (err) {
      console.error(err)
      alert('Failed to update pin status')
    }
  }

  if (!note) {
    return <p className="text-center mt-10 text-gray-500">Loading note...</p>
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* Pin/Unpin button */}
      <button
        onClick={togglePinned}
        className={`mb-4 px-4 py-2 rounded-full text-white font-semibold ${
          note.pinned ? 'bg-gray-500 hover:bg-gray-600' : 'bg-yellow-500 hover:bg-yellow-600'
        }`}
      >
        {note.pinned ? 'pinned' : 'Pin'}
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">{note.title}</h2>

      {/* Description */}
      <p className="text-gray-700 mb-4">{note.desc}</p>

      {/* Tags */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {note.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}


        </div>
      )}
<button onClick={DeleteNotes}>delete</button>
<button onClick={()=>{
  navigate(`/editnote/${note._id}`)
}}>Edit</button>
    </div>
  )
}

export default SingleNote
