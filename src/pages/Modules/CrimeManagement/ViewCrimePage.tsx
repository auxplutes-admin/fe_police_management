import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCrimeById } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, ArrowLeft } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
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
  crime_latitude: number
  crime_longitude: number
  crime_investigating_officer: string
  crime_status: string
  crime_outward_number: string
  crime_chargesheet_date: string
  crime_pending_reason: string
  crime_investigation_done: boolean
  crime_location: string
  crime_property_value: number
  crime_property_recovery: number
  crime_reveal_date: string
  crime_punishment_gt_7: boolean
  crime_forensic_expert_visit: boolean
  crime_e_sakshi_added: boolean
  crime_forensic_expert_visit_date: string
  crime_detention_period: string
  crime_new_investigation_officer: string
  crime_pending_duration: string
  crime_investigation_reason: string
  crime_complainant_address: string
  crime_complainant_age: number
  crime_complainant_name: string
  crime_complainant_gender: string
  crime_complainant_mobile_no: string
  crime_occurrence_date: string
  created_at: string
  updated_at: string
}


const ViewCrimePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [crime, setCrime] = useState<Crime | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchCrime = async () => {
      try {
        setIsLoading(true)
        const response = await getCrimeById({
          crime_id: id || ''
        })
        setCrime(response.data)
      } catch (error) {
        console.error('Error fetching crime:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchCrime()
    }
  }, [id])

  const handleBack = () => {
    navigate('/dashboard/crime-dashboard/crimes')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!crime) {
    return <div>Crime not found</div>
  }

  return (
    <div className="space-y-2">
      <div>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Crime Details</CardTitle>
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
                <h3 className="font-semibold">Basic Information</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <p className="text-sm text-gray-500">SR No:</p>
                  <p>{crime.sr_no}</p>
                  <p className="text-sm text-gray-500">Case No:</p>
                  <p>{crime.case_no}</p>
                  <p className="text-sm text-gray-500">Year:</p>
                  <p>{crime.crime_year}</p>
                  <p className="text-sm text-gray-500">Filing Date:</p>
                  <p>{new Date(crime.filing_date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">Status:</p>
                  <StatusBadge status={crime.crime_status} />
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Crime Classification</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <p className="text-sm text-gray-500">Section:</p>
                  <p>{crime.crime_section}</p>
                  <p className="text-sm text-gray-500">Part:</p>
                  <p>{crime.crime_part}</p>
                  <p className="text-sm text-gray-500">Type:</p>
                  <p>{crime.crime_type}</p>
                  <p className="text-sm text-gray-500">Subtype:</p>
                  <p>{crime.crime_subtype}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Complainant Details</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <p className="text-sm text-gray-500">Name:</p>
                  <p>{crime.crime_complainant_name}</p>
                  <p className="text-sm text-gray-500">Age:</p>
                  <p>{crime.crime_complainant_age}</p>
                  <p className="text-sm text-gray-500">Gender:</p>
                  <p>{crime.crime_complainant_gender}</p>
                  <p className="text-sm text-gray-500">Mobile:</p>
                  <p>{crime.crime_complainant_mobile_no}</p>
                  <p className="text-sm text-gray-500">Address:</p>
                  <p>{crime.crime_complainant_address}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Investigation Details</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <p className="text-sm text-gray-500">Investigating Officer:</p>
                  <p>{crime.crime_investigating_officer}</p>
                  <p className="text-sm text-gray-500">New Officer:</p>
                  <p>{crime.crime_new_investigation_officer}</p>
                  <p className="text-sm text-gray-500">Investigation Done:</p>
                  <p>{crime.crime_investigation_done ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mt-6">
            <h3 className="font-semibold">Additional Details</h3>
            <div className="grid grid-cols-2 gap-6 mt-2">
              <div>
                <p className="text-sm text-gray-500">Location:</p>
                <p className="mt-1">{crime.crime_location}</p>
                <p className="text-sm text-gray-500 mt-4">Property Value:</p>
                <p className="mt-1">₹{crime.crime_property_value}</p>
                <p className="text-sm text-gray-500 mt-4">Property Recovery:</p>
                <p className="mt-1">₹{crime.crime_property_recovery}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Reason:</p>
                <p className="mt-1">{crime.crime_pending_reason || 'N/A'}</p>
                <p className="text-sm text-gray-500 mt-4">Pending Duration:</p>
                <p className="mt-1">{crime.crime_pending_duration || 'N/A'}</p>
                <p className="text-sm text-gray-500 mt-4">Investigation Reason:</p>
                <p className="mt-1">{crime.crime_investigation_reason || 'N/A'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  )
}

export default ViewCrimePage