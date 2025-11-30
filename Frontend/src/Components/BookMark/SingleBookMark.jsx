import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const SingleBookMark = () => {
  const token = localStorage.getItem('omniToken')
  const navigate = useNavigate()
  const { id } = useParams()
  const [Data, SetData] = useState(null)

  useEffect(() => {
    const fetchBookmark = async () => {
      if (!token) return navigate('/login')

      try {
        const res = await axios.get(`http://localhost:3000/api/bookmark/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        console.log("Bookmark Response:", res.data)
        SetData(res.data)
      }
      catch (err) {
        console.log(err)
      }
    }

    fetchBookmark()
  }, [id, token, navigate])

  if (!Data) return <p>Loading...</p>

  return (
    <div className="p-6 max-w-md mx-auto border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-2">{Data.title}</h2>

      <a
        href={Data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline break-all"
      >
        {Data.url}
      </a>

      <p className="text-gray-700 mt-3">
        Category: <span className="font-bold">{Data.category}</span>
      </p>

      {Data.favorite && (
        <p className="text-yellow-600 text-lg font-bold mt-1">★ Favorite</p>
      )}

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => navigate(`/editbookmark/${Data._id}`)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => navigate('/bookmark')}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default SingleBookMark
