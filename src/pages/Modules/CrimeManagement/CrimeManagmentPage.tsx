  import React, { useState, useEffect } from 'react'
  import { useNavigate } from 'react-router-dom'
  import { Button } from "@/components/ui/button"
  import { Plus, FileSpreadsheet, Loader2, FileText, Eye, Edit } from 'lucide-react'
  import { getAllCrimes } from '@/api'
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
  import { StatusBadge } from '@/utils'

  interface Crime {
    crime_id: string
    sr_no: string
    case_no: string
    crime_year: string
    crime_section: string
    crime_part: string
    crime_type: string
    crime_subtype: string
    filing_date: string
    crime_investigating_officer: string
    crime_status: string
    crime_location: string
    crime_complainant_name: string
    crime_occurrence_date: string
    created_at: string
    updated_at: string
  }

  function CrimeManagmentPage() {
    const navigate = useNavigate()
    const [crimes, setCrimes] = useState<Crime[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const { loginResponse } = useAuth()

    useEffect(() => {
      fetchCrimes()
    }, [])

    const fetchCrimes = async () => {
      try {
        setIsLoading(true)
        const response = await getAllCrimes({
          station_id: loginResponse?.station_id || '',
          page: 1,
          limit: 10
        })
        setCrimes(response.data)
      } catch (error) {
        console.error('Error fetching crimes:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const handleAddNewCrime = () => {
      navigate('/dashboard/crime-dashboard/create')
    }

    const handleImportFromExcel = () => {
      // TODO: Implement Excel import functionality
      console.log('Import from Excel clicked')
    }

    const handleView = (crimeId: string) => {
      navigate(`/dashboard/crime-dashboard/view/${crimeId}`)
    }

    const handleEdit = (crimeId: string) => {
      navigate(`/dashboard/crime-dashboard/update/${crimeId}`)
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
                  Crime Records
                </CardTitle>
                <CardDescription>Manage and track all crime records</CardDescription>
              </div>
              <div className="space-x-4">
                <Button onClick={handleAddNewCrime} variant="default">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Crime
                </Button>
                <Button onClick={handleImportFromExcel} variant="outline">
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Import from Excel
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {crimes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No crime records found
              </div>
            ) : (
              <div className="border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="font-bold">Sr. No</TableHead>
                      <TableHead className="font-bold">Case No</TableHead>
                      <TableHead className="font-bold">Year</TableHead>
                      <TableHead className="font-bold">Section</TableHead>
                      <TableHead className="font-bold">Type</TableHead>
                      <TableHead className="font-bold">Filing Date</TableHead>
                      <TableHead className="font-bold">Investigation Officer</TableHead>
                      <TableHead className="font-bold">Status</TableHead>
                      <TableHead className="font-bold">Location</TableHead>
                      <TableHead className="font-bold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {crimes.map((crime) => (
                      <TableRow key={crime.crime_id}>
                        <TableCell>{crime.sr_no}</TableCell>
                        <TableCell>{crime.case_no}</TableCell>
                        <TableCell>{crime.crime_year}</TableCell>
                        <TableCell>{crime.crime_section}</TableCell>
                        <TableCell>{crime.crime_type}</TableCell>
                        <TableCell>{new Date(crime.filing_date).toLocaleDateString()}</TableCell>
                        <TableCell>{crime.crime_investigating_officer}</TableCell>
                        <TableCell>
                          <StatusBadge status={crime.crime_status} />
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{crime.crime_location}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleView(crime.crime_id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleEdit(crime.crime_id)}
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

  export default CrimeManagmentPage