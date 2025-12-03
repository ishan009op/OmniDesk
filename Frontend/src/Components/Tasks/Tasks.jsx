import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Tasks = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all') // all, completed, pending
  const navigate = useNavigate()
  const token = localStorage.getItem('omniToken')

  useEffect(() => {
  const fetchTasks = async () => {
    try {
      setLoading(true)
      const res = await axios.get('https://omnidesk-backend.onrender.com/api/tasks')
      // Ensure res.data is an array
      if (Array.isArray(res.data)) {
        setData(res.data)
      } else {
        setData([])
        console.warn("Tasks API did not return an array:", res.data)
      }
    } catch (err) {
      console.error(err)
      setError('Failed to load tasks. Please try again.')
      setData([]) // fallback
    } finally {
      setLoading(false)
    }
  }
  fetchTasks()
}, [token, navigate])


  const deleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return

    try {
      await axios.delete(`http://localhost:3000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setData(data.filter(task => task._id !== taskId))
    } catch (err) {
      console.error(err)
      alert('Failed to delete task')
    }
  }

  // Toggle task completion
  const toggleComplete = async (taskId, currentStatus) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/tasks/${taskId}`,
        { completed: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setData(data.map(task => 
        task._id === taskId ? { ...task, completed: !currentStatus } : task
      ))
    } catch (err) {
      console.error(err)
      alert('Failed to update task')
    }
  }

  // Filter tasks
  const filteredTasks = Array.isArray(data) ? data.filter(task => {
  if (filter === 'completed') return task.completed
  if (filter === 'pending') return !task.completed
  return true
}) : []

  // Calculate stats
  const stats = {
  total: Array.isArray(data) ? data.length : 0,
  completed: Array.isArray(data) ? data.filter(t => t.completed).length : 0,
  pending: Array.isArray(data) ? data.filter(t => !t.completed).length : 0
}


  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  // Check if task is overdue
  const isOverdue = (dueDate, completed) => {
    if (!dueDate || completed) return false
    return new Date(dueDate) < new Date()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-[#64748B] text-lg">Loading tasks...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2C3E50]">My Tasks</h1>
          <p className="text-[#64748B] mt-1">
            {stats.pending} pending • {stats.completed} completed
          </p>
        </div>
        <button
          onClick={() => navigate('/addtask')}
          className="bg-[#F59E0B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#D97706] transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm font-medium mb-1">Total Tasks</p>
              <p className="text-3xl font-bold text-[#2C3E50]">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-[#3B82F6] bg-opacity-10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm font-medium mb-1">Pending</p>
              <p className="text-3xl font-bold text-[#F59E0B]">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-[#F59E0B] bg-opacity-10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm font-medium mb-1">Completed</p>
              <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-[#2C3E50] text-white'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC]'
          }`}
        >
          All Tasks ({stats.total})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'pending'
              ? 'bg-[#F59E0B] text-white'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC]'
          }`}
        >
          Pending ({stats.pending})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'completed'
              ? 'bg-green-600 text-white'
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC]'
          }`}
        >
          Completed ({stats.completed})
        </button>
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-semibold text-[#2C3E50] mb-2">
            {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
          </h2>
          <p className="text-[#64748B] mb-6">
            {filter === 'all' 
              ? 'Start organizing your work by creating your first task'
              : `You have no ${filter} tasks at the moment`
            }
          </p>
          {filter === 'all' && (
            <button
              onClick={() => navigate('/addtask')}
              className="bg-[#3B82F6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2563EB] transition-colors"
            >
              Create Your First Task
            </button>
          )}
        </div>
      ) : (
        /* Tasks List */
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className={`bg-white border rounded-lg p-6 hover:shadow-md transition-shadow ${
                task.completed 
                  ? 'border-green-200 bg-green-50' 
                  : isOverdue(task.dueDate, task.completed)
                  ? 'border-red-200 bg-red-50'
                  : 'border-[#E2E8F0]'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                  onClick={() => toggleComplete(task._id, task.completed)}
                  className={`mt-1 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                    task.completed
                      ? 'bg-green-600 border-green-600'
                      : 'border-[#CBD5E1] hover:border-[#3B82F6]'
                  }`}
                >
                  {task.completed && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                {/* Task Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold mb-1 ${
                        task.completed ? 'line-through text-[#94A3B8]' : 'text-[#2C3E50]'
                      }`}>
                        {task.title}
                      </h3>
                      {task.desc && (
                        <p className={`text-sm ${
                          task.completed ? 'text-[#94A3B8]' : 'text-[#64748B]'
                        }`}>
                          {task.desc}
                        </p>
                      )}
                    </div>

                    {/* Priority Badge */}
                    {task.priority && (
                      <span className={`ml-4 px-3 py-1 rounded-full text-xs font-medium ${
                        task.priority === 'high' ? 'bg-red-100 text-red-700' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {task.priority}
                      </span>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-[#94A3B8] mb-3">
                    {task.category && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {task.category}
                      </span>
                    )}
                    {task.dueDate && (
                      <span className={`flex items-center gap-1 ${
                        isOverdue(task.dueDate, task.completed) ? 'text-red-600 font-medium' : ''
                      }`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Due: {formatDate(task.dueDate)}
                        {isOverdue(task.dueDate, task.completed) && ' (Overdue)'}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/singletask/${task._id}`)}
                      className="px-4 py-1.5 bg-[#2C3E50] text-white rounded text-sm font-medium hover:bg-[#1e293b] transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/edittask/${task._id}`)}
                      className="px-4 py-1.5 bg-[#3B82F6] text-white rounded text-sm font-medium hover:bg-[#2563EB] transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="px-4 py-1.5 border-2 border-red-500 text-red-500 rounded text-sm font-medium hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tasks