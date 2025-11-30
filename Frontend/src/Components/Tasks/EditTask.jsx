import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditTask = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [Title, SetTitle] = useState('')
  const [Desc, SetDesc] = useState('')
  const [Status, SetStatus] = useState('pending')
  const [Priority, SetPriority] = useState('low')

  // Fetch existing task data
  useEffect(() => {
    const token = localStorage.getItem('omniToken')
    if (!token) return navigate('/login')

    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const task = res.data
        SetTitle(task.title)
        SetDesc(task.desc)
        SetStatus(task.status)
        SetPriority(task.priority)
      } catch (err) {
        console.error(err)
        alert('Failed to fetch task')
      }
    }
    fetchTask()
  }, [id, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('omniToken')
    if (!token) return alert('No token found! Please login again.')

    try {
      const updatedTask = { title: Title, desc: Desc, status: Status, priority: Priority }
      const res = await axios.put(`http://localhost:3000/api/tasks/${id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log('Updated Task:', res.data)
      alert('Task updated successfully!')
      navigate('/task') // Redirect back to tasks list
    } catch (err) {
      console.error(err)
      alert('Failed to update task')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Task</h2>
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
          Update Task
        </button>
      </form>
    </div>
  )
}

export default EditTask
