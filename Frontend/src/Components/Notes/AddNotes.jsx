import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddNotes = () => {
  const navigate = useNavigate()
  const [Title, SetTitle] = useState('')
  const [Desc, SetDesc] = useState('')
  const [Pinned, SetPinned] = useState(false)
  const [Tags, SetTags] = useState('') // can be comma-separated tags

  const handleSubmit = async (e) => {
  e.preventDefault()

  const token = localStorage.getItem('omniToken')
  if (!token) return alert('No token found! Please login again.')

  try {
  const newNote = {
  title: Title,
  desc: Desc,
  pinned: Pinned,
  tags: Tags.split(' ').map(tag => tag.trim()).filter(tag => tag !== '')
}


    const res = await axios.post('https://omnidesk-backend.onrender.com/api/notes', newNote, {
      headers: { Authorization: `Bearer ${token}` }
    })

    console.log('New Note:', res.data)
    alert('Note added successfully!')
    navigate('/notes')
  } catch (err) {
    console.error(err)
    alert('Failed to add Note')
  }
}


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add Note</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Enter Title"
          value={Title}
          onChange={(e) => SetTitle(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Description */}
        <textarea
          placeholder="Enter Description"
          value={Desc}
          onChange={(e) => SetDesc(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          rows={4}
          required
        />

        {/* Pinned */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={Pinned}
            onChange={(e) => SetPinned(e.target.checked)}
            className="accent-blue-600"
          />
          Pinned
        </label>

        {/* Tags */}
        <input
          type="text"
          placeholder="Enter tags separated by commas"
          value={Tags}
          onChange={(e) => SetTags(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Add Note
        </button>
      </form>
    </div>
  )
}

export default AddNotes
