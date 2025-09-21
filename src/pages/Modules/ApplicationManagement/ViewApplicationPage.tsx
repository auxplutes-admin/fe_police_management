import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getApplicationById } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/utils'

interface Application {
  application_id: string
  application_no: string
  inward_no: string
  received_from: string
  received_date: string
  applicant_name: string
  applicant_address: string
  applicant_mobile: string
  respondent_name: string
  respondent_mobile: string
  respondent_address: string
  application_type: string
  brief_matter: string
  investigation_officer: string
  previous_officer: string
  current_status: string
  action_taken: string
  outward_date: string
  application_classification: string
}

const ViewApplicationPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { loginResponse } = useAuth()
  const [application, setApplication] = useState<Application | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setIsLoading(true)
        const response = await getApplicationById({
          application_id: id || '',
          officer_id: loginResponse?.officer_id || ''
        })
        if (response.status === 'success') {
          setApplication(response.data)
        }
      } catch (error) {
        console.error('Error fetching application:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchApplication()
    }
  }, [id])

  const handleBack = () => {
    navigate('/dashboard/application-dashboard/applications')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!application) {
    return <div>Application not found</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Application Details</CardTitle>
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Application Information</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <p className="text-sm text-gray-500">Application No:</p>
                  <p>{application.application_no}</p>
                  <p className="text-sm text-gray-500">Inward No:</p>
                  <p>{application.inward_no}</p>
                  <p className="text-sm text-gray-500">Received From:</p>
                  <p>{application.received_from}</p>
                  <p className="text-sm text-gray-500">Received Date:</p>
                  <p>{new Date(application.received_date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">Status:</p>
                  <StatusBadge status={application.current_status} />
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Applicant Details</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <p className="text-sm text-gray-500">Name:</p>
                  <p>{application.applicant_name}</p>
                  <p className="text-sm text-gray-500">Address:</p>
                  <p>{application.applicant_address}</p>
                  <p className="text-sm text-gray-500">Mobile:</p>
                  <p>{application.applicant_mobile}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Respondent Details</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <p className="text-sm text-gray-500">Name:</p>
                  <p>{application.respondent_name}</p>
                  <p className="text-sm text-gray-500">Address:</p>
                  <p>{application.respondent_address}</p>
                  <p className="text-sm text-gray-500">Mobile:</p>
                  <p>{application.respondent_mobile}</p>
                </div>
              </div>
 
              <div>
                <h3 className="font-semibold">Investigation Details</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <p className="text-sm text-gray-500">Type:</p>
                  <p>{application.application_type}</p>
                  <p className="text-sm text-gray-500">Classification:</p>
                  <p>{application.application_classification}</p>
                  <p className="text-sm text-gray-500">Current Officer:</p>
                  <p>{application.investigation_officer}</p>
                  <p className="text-sm text-gray-500">Previous Officer:</p>
                  <p>{application.previous_officer}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mt-6">
            <h3 className="font-semibold">Case Details</h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Brief Matter:</p>
              <p className="mt-1">{application.brief_matter}</p>
              <p className="text-sm text-gray-500 mt-4">Action Taken:</p>
              <p className="mt-1">{application.action_taken}</p>
              <p className="text-sm text-gray-500 mt-4">Outward Date:</p>
              <p className="mt-1">{application.outward_date ? new Date(application.outward_date).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  )
}

export default ViewApplicationPage