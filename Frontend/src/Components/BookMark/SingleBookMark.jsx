import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const SingleBookMark = () => {
  const token = localStorage.getItem('omniToken')
  const navigate = useNavigate()
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBookmark = async () => {
      if (!token) return navigate('/login')

      try {
        setLoading(true)
        const res = await axios.get(`http://localhost:3000/api/bookmark/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        console.log("Bookmark Response:", res.data)
        setData(res.data)
      } catch (err) {
        console.error(err)
        setError('Failed to load bookmark. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchBookmark()
  }, [id, token, navigate])

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this bookmark?')) return

    try {
      await axios.delete(`http://localhost:3000/api/bookmark/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/bookmarks')
    } catch (err) {
      console.error(err)
      alert('Failed to delete bookmark')
    }
  }

  const formatUrl = (url) => {
    if (!url) return '#'
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }
    return `https://${url}`
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown'
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-[#64748B] text-lg">Loading bookmark...</div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-red-500 text-lg mb-4">{error || 'Bookmark not found'}</div>
        <button
          onClick={() => navigate('/bookmarks')}
          className="text-[#3B82F6] hover:text-[#2563EB] font-medium"
        >
          ← Back to Bookmarks
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/bookmark')}
          className="flex items-center gap-2 text-[#64748B] hover:text-[#2C3E50] transition-colors mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Bookmarks
        </button>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
        {/* Header Section */}
        <div className="p-8 border-b border-[#E2E8F0]">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              {/* Category Badge */}
              <span className="inline-block bg-[#3B82F6] bg-opacity-10 text-[#3B82F6] text-sm font-medium px-3 py-1 rounded-full mb-3">
                {data.category}
              </span>
              
              {/* Title */}
              <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">
                {data.title}
              </h1>

              {/* Description */}
              {data.description && (
                <p className="text-[#64748B] text-lg">
                  {data.description}
                </p>
              )}
            </div>

            {/* Favorite Star */}
            {data.favorite && (
              <div className="ml-4">
                <span className="text-4xl">⭐</span>
              </div>
            )}
          </div>
        </div>

        {/* Details Section */}
        <div className="p-8">
          <div className="space-y-6">
            {/* URL */}
            <div>
              <label className="block text-sm font-medium text-[#64748B] mb-2">
                URL
              </label>
              <a
                href={formatUrl(data.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#3B82F6] hover:text-[#2563EB] text-lg break-all group"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="group-hover:underline">{data.url}</span>
              </a>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#E2E8F0]">
              {/* Created Date */}
              <div>
                <label className="block text-sm font-medium text-[#64748B] mb-1">
                  Created
                </label>
                <div className="flex items-center gap-2 text-[#2C3E50]">
                  <svg className="w-5 h-5 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(data.createdAt)}</span>
                </div>
              </div>

              {/* Updated Date */}
              {data.updatedAt && (
                <div>
                  <label className="block text-sm font-medium text-[#64748B] mb-1">
                    Last Updated
                  </label>
                  <div className="flex items-center gap-2 text-[#2C3E50]">
                    <svg className="w-5 h-5 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>{formatDate(data.updatedAt)}</span>
                  </div>
                </div>
              )}

              {/* Favorite Status */}
              <div>
                <label className="block text-sm font-medium text-[#64748B] mb-1">
                  Status
                </label>
                <div className="flex items-center gap-2">
                  {data.favorite ? (
                    <span className="inline-flex items-center gap-1 text-[#F59E0B] font-medium">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Favorite
                    </span>
                  ) : (
                    <span className="text-[#64748B]">Not favorited</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-8 bg-[#F8FAFC] border-t border-[#E2E8F0] flex gap-3">
          <button
            onClick={() => navigate(`/editbookmark/${data._id}`)}
            className="flex-1 bg-[#3B82F6] text-white py-3 rounded-lg font-semibold hover:bg-[#2563EB] transition-colors flex items-center justify-center gap-2 p-3 text-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Bookmark
          </button>
          
          <button
            onClick={handleDelete}
            className="px-6 py-3 border-2 border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>

          <button
            onClick={() => window.open(formatUrl(data.url), '_blank')}
            className="px-6 py-3 bg-[#2C3E50] text-white rounded-lg font-semibold hover:bg-[#1e293b] transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Visit Site
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleBookMark