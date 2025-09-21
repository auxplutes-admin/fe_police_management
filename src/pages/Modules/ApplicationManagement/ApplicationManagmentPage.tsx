import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Plus, FileSpreadsheet, Loader2, FileText, Eye, Edit } from 'lucide-react'
import { getAllApplications } from '@/api'
import { useAuth } from '@/hooks/useAuth'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge' 
import { StatusBadge } from '@/utils'

interface Application {
  application_id: string
  sr_no: number
  application_no: number
  inward_no: number
  received_from: string
  source_outward_no: string
  police_station_inward_no: number
  received_date: string
  year: number
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
  created_at: string
  updated_at: string
  created_by: string
  updated_by: string
  deleted_at: string | null
  deleted_by: string | null
  is_active: boolean
  is_deleted: boolean
  station_id: string
}

function ApplicationManagmentPage() {
  const navigate = useNavigate()
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { loginResponse } = useAuth()

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setIsLoading(true)
      const response = await getAllApplications({
        station_id: loginResponse?.station_id || '',
        page: 1,
        limit: 10
      })
      setApplications(response.data.applications)
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddNewApplication = () => {
    navigate('/dashboard/application-dashboard/create')
  }

  const handleImportFromExcel = () => {
    // TODO: Implement Excel import functionality
    console.log('Import from Excel clicked')
  }

  const handleView = (applicationId: string) => {
    navigate(`/dashboard/application-dashboard/view/${applicationId}`)
  }

  const handleEdit = (applicationId: string) => {
    navigate(`/dashboard/application-dashboard/edit/${applicationId}`)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="w-full rounded-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText size={20} />
                Application Records
              </CardTitle>
              <CardDescription>Manage and track all application records</CardDescription>
            </div>
            <div className="space-x-4">
              <Button onClick={handleAddNewApplication} variant="default">
                <Plus className="w-4 h-4 mr-2" />
                Add New Application
              </Button>
              <Button onClick={handleImportFromExcel} variant="outline">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Import from Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No application records found
            </div>
          ) : (
            <div className="border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="font-bold">Sr. No</TableHead>
                    <TableHead className="font-bold">Application No</TableHead>
                    <TableHead className="font-bold">Inward No</TableHead>
                    <TableHead className="font-bold">Applicant Name</TableHead>
                    <TableHead className="font-bold">Received From</TableHead>
                    <TableHead className="font-bold">Received Date</TableHead>
                    <TableHead className="font-bold">Investigation Officer</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="font-bold">Brief Matter</TableHead>
                    <TableHead className="font-bold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application.application_id}>
                      <TableCell>{application.sr_no}</TableCell>
                      <TableCell>{application.application_no}</TableCell>
                      <TableCell>{application.inward_no}</TableCell>
                      <TableCell>{application.applicant_name}</TableCell>
                      <TableCell>{application.received_from}</TableCell>
                      <TableCell>{new Date(application.received_date).toLocaleDateString()}</TableCell>
                      <TableCell>{application.investigation_officer}</TableCell>
                      <TableCell>
                        <StatusBadge status={application.current_status} />
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{application.brief_matter}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleView(application.application_id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleEdit(application.application_id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </div>
    </div>
  )
}

export default ApplicationManagmentPage