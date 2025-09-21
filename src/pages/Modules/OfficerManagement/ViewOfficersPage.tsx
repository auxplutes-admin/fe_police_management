import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPoliceOfficerById } from '@/api'
import { useAuth } from '@/hooks/useAuth'
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface Officer {
  officer_id: string;
  station_id: string;
  officer_name: string;
  officer_designation: string;
  officer_badge_number: string;
  officer_mobile_number: string;
  officer_email: string;
  officer_username: string;
  officer_joining_date: Date;
  officer_status: string;
  station_name: string;
  station_address: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
}

const ViewOfficersPage: React.FC = () => {
  const navigate = useNavigate()
  const { loginResponse } = useAuth()
  const [officer, setOfficer] = useState<Officer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const { id: officerId } = useParams()

  useEffect(() => {
    const fetchOfficer = async () => {
      try {
        const response = await getPoliceOfficerById({
          officer_id: officerId!,
          station_id: loginResponse?.station_id || ''
        })

        if (response.status === 'success') {
          setOfficer(response.data)
        } else {
          setError('Failed to fetch officer details')
        }
      } catch (err) {
        setError('An error occurred while fetching officer details')
      } finally {
        setLoading(false)
      }
    }

    if (officerId) {
      fetchOfficer()
    }
  }, [officerId])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!officer) return <div>No officer found</div>

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="rounded-lg">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Full Name</label>
                    <p className="font-medium">{officer.officer_name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Badge Number</label>
                    <p className="font-medium">{officer.officer_badge_number}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Designation</label>
                    <p className="font-medium">{officer.officer_designation}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Username</label>
                    <p className="font-medium">{officer.officer_username}</p>
                  </div>
                </div>
              </CardContent>
            </div>

            <div className="rounded-lg">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Email Address</label>
                    <p className="font-medium">{officer.officer_email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Mobile Number</label>
                    <p className="font-medium">{officer.officer_mobile_number}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Station Name</label>
                    <p className="font-medium">{officer.station_name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Station Address</label>
                    <p className="font-medium">{officer.station_address}</p>
                  </div>
                </div>
              </CardContent>
            </div>

            <div className="rounded-lg">
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Joining Date</label>
                    <p className="font-medium">
                      {format(new Date(officer.officer_joining_date), 'PPP')}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Last Updated</label>
                    <p className="font-medium">
                      {format(new Date(officer.updated_at), 'PPP')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        )
      case 'reports':
        return (
          <div className="rounded-lg">
            <CardContent className="p-2">
              <p className="text-gray-500">No reports available at this time.</p>
            </CardContent>
          </div>
        )
      case 'sessions':
        return (
          <div className="rounded-lg">
            <CardContent className="p-2">
              <p className="text-gray-500">Session history will be displayed here.</p>
            </CardContent>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold">{officer.officer_name} Profile</h2>
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-sm ${
            officer.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {officer.officer_status}
          </span>
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard/officer-dashboard/officers')}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </div>

      <div className="w-full">
        <div className="flex border-b mb-2">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'overview' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'reports' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('reports')}
          >
            Reports
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'sessions' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('sessions')}
          >
            Session History
          </button>
        </div>

        {renderTabContent()}
      </div>
    </div>
  )
}

export default ViewOfficersPage