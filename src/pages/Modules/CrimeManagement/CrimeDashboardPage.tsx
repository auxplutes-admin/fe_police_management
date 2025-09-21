import React from 'react'
import { useNavigate } from 'react-router-dom'

const CrimeDashboardPage = () => {
  const navigate = useNavigate()

  const handleViewCrimes = () => {
    navigate('/dashboard/crime-dashboard/crimes')
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crime Management System</h1>
      <div className="flex justify-between items-center">
        <div className="max-w-2xl">
          <p className="text-gray-600">
            Welcome to the Crime Management System. Here you can view and manage crime records.
          </p>
        </div>
        <button
          onClick={handleViewCrimes}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          View Crime List
        </button>
      </div>
    </div>
  )
}

export default CrimeDashboardPage