import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { createApplication } from '@/api'
import { Button } from '@/components/ui/button'

const CreateApplication = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    sr_no: '',
    application_no: '',
    inward_no: '',
    received_from: '',
    source_outward_no: '',
    police_station_inward_no: '',
    received_date: '',
    year: '',
    applicant_name: '',
    applicant_address: '',
    applicant_mobile: '',
    respondent_name: '',
    respondent_mobile: '',
    respondent_address: '',
    application_type: '',
    brief_matter: '',
    investigation_officer: '',
    previous_officer: '',
    current_status: '',
    action_taken: '',
    outward_date: '',
    application_classification: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await createApplication(formData)
      navigate('/dashboard/application-dashboard')
    } catch (error) {
      console.error('Error creating application:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="bg-gray-50 p-2 mb-4">
      <div className="mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Application</h1>
          <p className="text-gray-600">Fill in the application details below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-3">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="sr_no" className="text-sm font-medium text-gray-700">SR No.</Label>
                <Input
                  id="sr_no"
                  name="sr_no"
                  value={formData.sr_no}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="application_no" className="text-sm font-medium text-gray-700">Application No.</Label>
                <Input
                  id="application_no"
                  name="application_no"
                  value={formData.application_no}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inward_no" className="text-sm font-medium text-gray-700">Inward No.</Label>
                <Input
                  id="inward_no"
                  name="inward_no"
                  value={formData.inward_no}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="received_from" className="text-sm font-medium text-gray-700">Received From</Label>
                <Input
                  id="received_from"
                  name="received_from"
                  value={formData.received_from}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source_outward_no" className="text-sm font-medium text-gray-700">Source Outward No.</Label>
                <Input
                  id="source_outward_no"
                  name="source_outward_no"
                  value={formData.source_outward_no}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="police_station_inward_no" className="text-sm font-medium text-gray-700">Police Station Inward No.</Label>
                <Input
                  id="police_station_inward_no"
                  name="police_station_inward_no"
                  value={formData.police_station_inward_no}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="received_date" className="text-sm font-medium text-gray-700">Received Date</Label>
                <Input
                  type="date"
                  id="received_date"
                  name="received_date"
                  value={formData.received_date}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year" className="text-sm font-medium text-gray-700">Year</Label>
                <Input
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-3">Applicant Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="applicant_name" className="text-sm font-medium text-gray-700">Applicant Name</Label>
                <Input
                  id="applicant_name"
                  name="applicant_name"
                  value={formData.applicant_name}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="applicant_address" className="text-sm font-medium text-gray-700">Applicant Address</Label>
                <Input
                  id="applicant_address"
                  name="applicant_address"
                  value={formData.applicant_address}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="applicant_mobile" className="text-sm font-medium text-gray-700">Applicant Mobile</Label>
                <Input
                  id="applicant_mobile"
                  name="applicant_mobile"
                  value={formData.applicant_mobile}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-3">Respondent Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="respondent_name" className="text-sm font-medium text-gray-700">Respondent Name</Label>
                <Input
                  id="respondent_name"
                  name="respondent_name"
                  value={formData.respondent_name}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="respondent_mobile" className="text-sm font-medium text-gray-700">Respondent Mobile</Label>
                <Input
                  id="respondent_mobile"
                  name="respondent_mobile"
                  value={formData.respondent_mobile}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="respondent_address" className="text-sm font-medium text-gray-700">Respondent Address</Label>
                <Input
                  id="respondent_address"
                  name="respondent_address"
                  value={formData.respondent_address}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-3">Application Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="application_type" className="text-sm font-medium text-gray-700">Application Type</Label>
                <Input
                  id="application_type"
                  name="application_type"
                  value={formData.application_type}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brief_matter" className="text-sm font-medium text-gray-700">Brief Matter</Label>
                <Input
                  id="brief_matter"
                  name="brief_matter"
                  value={formData.brief_matter}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="investigation_officer" className="text-sm font-medium text-gray-700">Investigation Officer</Label>
                <Input
                  id="investigation_officer"
                  name="investigation_officer"
                  value={formData.investigation_officer}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="previous_officer" className="text-sm font-medium text-gray-700">Previous Officer</Label>
                <Input
                  id="previous_officer"
                  name="previous_officer"
                  value={formData.previous_officer}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="current_status" className="text-sm font-medium text-gray-700">Current Status</Label>
                <Input
                  id="current_status"
                  name="current_status"
                  value={formData.current_status}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="action_taken" className="text-sm font-medium text-gray-700">Action Taken</Label>
                <Input
                  id="action_taken"
                  name="action_taken"
                  value={formData.action_taken}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="outward_date" className="text-sm font-medium text-gray-700">Outward Date</Label>
                <Input
                  type="date"
                  id="outward_date"
                  name="outward_date"
                  value={formData.outward_date}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="application_classification" className="text-sm font-medium text-gray-700">Application Classification</Label>
                <Input
                  id="application_classification"
                  name="application_classification"
                  value={formData.application_classification}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6 mb-6">
            <Button 
              type="button" 
              className="bg-gray-500 text-white"
              onClick={() => navigate('/dashboard/application-dashboard')}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Application'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateApplication