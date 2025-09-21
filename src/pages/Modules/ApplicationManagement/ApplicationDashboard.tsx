import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getApplicationsByType } from '@/api'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import ApplicationsTypeGraph from '@/components/Graphs/Applications/ApplicationsTypeGraph'

const ApplicationDashboard: React.FC = () => {
  const { loginResponse } = useAuth()
  const [applicationsByType, setApplicationsByType] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleViewApplications = () => {
    navigate('/dashboard/application-dashboard/applications')
  }

  const fetchApplicationsByType = async () => {
    try {
      setLoading(true)
      const response = await getApplicationsByType({
        station_id: loginResponse?.station_id || ''
      })
      setApplicationsByType(response.data)
    } catch (error) {
      console.error('Failed to fetch applications by type:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplicationsByType()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Application Management System</h1>
      <div className="flex justify-between items-center mb-8">
        <div className="max-w-2xl">
          <p className="text-gray-600">
            Welcome to the Application Management System. Here you can view and manage application records.
          </p>
        </div>
        <button
          onClick={handleViewApplications}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          View Application List
        </button>
      </div>

      <div className='border'>
        <CardHeader>
          <CardTitle>Applications by Type</CardTitle>
          <CardDescription>Distribution of applications across different types</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-[300px]">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className='h-[800px]'>
              <ApplicationsTypeGraph data={applicationsByType} />
            </div>
          )}
        </CardContent>
      </div>
    </div>
  )
}

export default ApplicationDashboard