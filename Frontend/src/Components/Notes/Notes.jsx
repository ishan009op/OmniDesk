import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Notes = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('omniToken')

  useEffect(() => {
    if (!token) return navigate('/register')

    const fetchNotes = async () => {
      try {
        setLoading(true)
        const res = await axios.get('http://localhost:3000/api/notes', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setNotes(res.data)
      } catch (err) {
        console.error(err)
        setError('Failed to load notes. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [token, navigate])

  // Delete handler
  const handleDelete = async (id, e) => {
    e.stopPropagation() // Prevent navigation when clicking delete
    if (!window.confirm('Are you sure you want to delete this note?')) return
    
    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotes(notes.filter(note => note._id !== id))
    } catch (err) {
      console.error(err)
      alert('Failed to delete note')
    }
  }

  // Edit handler
  const handleEdit = (id, e) => {
    e.stopPropagation() // Prevent navigation when clicking edit
    navigate(`/editnote/${id}`)
  }

  // Filter notes by search query
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (note.tags && note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  )

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-[#64748B] text-lg">Loading notes...</div>
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
          <h1 className="text-3xl font-bold text-[#2C3E50]">My Notes</h1>
          <p className="text-[#64748B] mt-1">
            {notes.length} {notes.length === 1 ? 'note' : 'notes'} saved
          </p>
        </div>
        <button
          onClick={() => navigate('/addnotes')}
          className="bg-[#F59E0B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#D97706] transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Note
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <svg 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#94A3B8]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search notes by title, content, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
          />
        </div>
      </div>

      {/* Empty State */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-semibold text-[#2C3E50] mb-2">
            {searchQuery ? 'No notes found' : 'No notes yet'}
          </h2>
          <p className="text-[#64748B] mb-6">
            {searchQuery 
              ? 'Try adjusting your search query'
              : 'Start capturing your ideas and thoughts'
            }
          </p>
          {!searchQuery && (
            <button
              onClick={() => navigate('/addnotes')}
              className="bg-[#3B82F6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2563EB] transition-colors"
            >
              Create Your First Note
            </button>
          )}
        </div>
      ) : (
        /* Notes Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              onClick={() => navigate(`/singlenote/${note._id}`)}
              className="bg-white border border-[#E2E8F0] rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer group relative"
            >
              {/* Pin indicator (if you have pinned notes) */}
              {note.pinned && (
                <div className="absolute top-4 right-4">
                  <span className="text-xl">📌</span>
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-semibold text-[#2C3E50] mb-3 pr-8 line-clamp-2">
                {note.title}
              </h3>

              {/* Description/Content */}
              <p className="text-[#64748B] text-sm mb-4 line-clamp-3">
                {note.desc}
              </p>

              {/* Tags */}
              {note.tags && note.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-4">
                  {note.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#3B82F6] bg-opacity-10 text-[#3B82F6] font-medium px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {note.tags.length > 3 && (
                    <span className="text-xs text-[#94A3B8] px-2 py-1">
                      +{note.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Footer - Date & Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                <span className="text-xs text-[#94A3B8]">
                  {note.createdAt ? formatDate(note.createdAt) : 'Recently'}
                </span>
                
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => handleEdit(note._id, e)}
                    className="p-2 bg-[#3B82F6] text-white rounded hover:bg-[#2563EB] transition-colors"
                    title="Edit note"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => handleDelete(note._id, e)}
                    className="p-2 border-2 border-red-500 text-red-500 rounded hover:bg-red-50 transition-colors"
                    title="Delete note"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Notes