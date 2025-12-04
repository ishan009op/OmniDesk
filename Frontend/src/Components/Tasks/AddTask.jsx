import React, { useState } from 'react'
import axios from 'axios'

const AddTask = () => {
  const [Title, SetTitle] = useState('')
  const [Desc, SetDesc] = useState('')
  const [Status, SetStatus] = useState('pending')
  const [Priority, SetPriority] = useState('low')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('omniToken')
    if (!token) return alert('No token found! Please login again.')

    try {
      const newTask = { title: Title, desc: Desc, status: Status, priority: Priority }
      const res = await axios.post('https://omnidesk-backend.onrender.com/api/tasks', newTask, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log('New Task:', res.data)
      alert('Task added successfully!')
      SetTitle('')
      SetDesc('')
      SetStatus('pending')
      SetPriority('low')
    } catch (err) {
      console.error(err)
      alert('Failed to add task')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add Task</h2>
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
        <input
          type="text"
          placeholder="Enter Description"
          value={Desc}
          onChange={(e) => SetDesc(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Status */}
        <div>
          <h4 className="font-medium mb-2">Status:</h4>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="status"
                value="pending"
                checked={Status === 'pending'}
                onChange={(e) => SetStatus(e.target.value)}
                className="accent-blue-500"
              />
              Pending
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="status"
                value="in progress"
                checked={Status === 'in progress'}
                onChange={(e) => SetStatus(e.target.value)}
                className="accent-blue-500"
              />
              In Progress
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="status"
                value="completed"
                checked={Status === 'completed'}
                onChange={(e) => SetStatus(e.target.value)}
                className="accent-blue-500"
              />
              Completed
            </label>
          </div>
        </div>

        {/* Priority */}
        <div>
          <h4 className="font-medium mb-2">Priority:</h4>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="priority"
                value="low"
                checked={Priority === 'low'}
                onChange={(e) => SetPriority(e.target.value)}
                className="accent-green-500"
              />
              Low
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="priority"
                value="medium"
                checked={Priority === 'medium'}
                onChange={(e) => SetPriority(e.target.value)}
                className="accent-yellow-500"
              />
              Medium
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="priority"
                value="high"
                checked={Priority === 'high'}
                onChange={(e) => SetPriority(e.target.value)}
                className="accent-red-500"
              />
              High
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </form>
    </div>
  )
}

export default AddTask
