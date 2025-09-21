import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { createCrime, getLatestSrNo } from '@/api'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { toast } from "sonner"
import {
  getAllPoliceOfficersByStationId,
  getAllCrimeParts,
  getAllCrimeTypes,
  getAllCrimeSubTypes
} from '@/api'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"

const CreateCrimePage = () => {
  const { loginResponse } = useAuth()
  const navigate = useNavigate()
  const [crimeParts, setCrimeParts] = useState([])
  const [crimeTypes, setCrimeTypes] = useState([])
  const [crimeSubTypes, setCrimeSubTypes] = useState([])
  const [policeOfficers, setPoliceOfficers] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isFetchingSrNo, setIsFetchingSrNo] = useState(false)
  const [formData, setFormData] = useState({
    sr_no: '',
    case_no: '',
    crime_year: '',
    crime_section: '',
    crime_part: '',
    crime_type: '',
    crime_subtype: '',
    filing_date: '',
    crime_latitude: 0,
    crime_longitude: 0,
    crime_investigating_officer: '',
    crime_status: '',
    crime_outward_number: '',
    crime_chargesheet_date: '',
    crime_pending_reason: '',
    crime_investigation_done: false,
    crime_location: '',
    crime_property_value: 0,
    crime_property_recovery: 0,
    crime_reveal_date: '',
    crime_punishment_gt_7: false,
    crime_forensic_expert_visit: false,
    crime_e_sakshi_added: false,
    crime_forensic_expert_visit_date: '',
    crime_detention_period: '',
    crime_new_investigation_officer: '',
    crime_pending_duration: '',
    crime_investigation_reason: '',
    crime_complainant_address: '',
    crime_complainant_age: 0,
    crime_complainant_name: '',
    crime_complainant_gender: '',
    crime_complainant_mobile_no: '',
    crime_occurrence_date: '',
    station_id: loginResponse?.station_id || ''
  })

  const fetchCrimeParts = async () => {
    try {
      const response = await getAllCrimeParts({ station_id: loginResponse?.station_id || '' })
      setCrimeParts(response.data)
    } catch (error) {
      toast.error("Failed to fetch crime parts")
    }
  }

  const fetchCrimeTypes = async () => {
    try {
      const response = await getAllCrimeTypes({ station_id: loginResponse?.station_id || '' })
      setCrimeTypes(response.data)
    } catch (error) {
      toast.error("Failed to fetch crime types")
    }
  }

  const fetchCrimeSubTypes = async () => {
    try {
      const response = await getAllCrimeSubTypes({ station_id: loginResponse?.station_id || '' })
      setCrimeSubTypes(response.data)
    } catch (error) {
      toast.error("Failed to fetch crime sub types")
    }
  }

  const fetchPoliceOfficers = async () => {
    try {
      const response = await getAllPoliceOfficersByStationId({
        station_id: loginResponse?.station_id || ''
      })
      setPoliceOfficers(response.data)
    } catch (error) {
      toast.error("Failed to fetch police officers")
    }
  }

  const fetchLatestSrNo = async () => {
    try {
      setIsFetchingSrNo(true)
      const response = await getLatestSrNo({ station_id: loginResponse?.station_id || '' })
      setFormData(prev => ({
        ...prev,
        sr_no: response.data
      }))
    } catch (error) {
      toast.error("Failed to fetch latest SR number") 
    } finally {
      setIsFetchingSrNo(false)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCrimeParts()
    fetchCrimeTypes()
    fetchCrimeSubTypes()
    fetchPoliceOfficers()
    fetchLatestSrNo()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsSubmitting(true)
      await createCrime(formData)
      navigate('/dashboard/crime-dashboard')
      toast.success("Crime created successfully")
    } catch (error) {
      console.error('Error creating crime:', error)
      toast.error("Error creating crime")
    } finally {
      setIsSubmitting(false)
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
    <div className="h-full overflow-y-auto bg-gray-50 p-2">
      <div className="flex justify-between items-center mb-4"> 
        <h5 className="text-xl font-bold text-gray-900 mb-2">Create New Crime Record</h5>
        <Button variant="destructive" onClick={() => navigate('/dashboard/crime-dashboard/crimes')}>
        <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>
      <div className="mx-auto pb-6">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="bg-white shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-3">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="sr_no" className="text-sm font-medium text-gray-700">SR No</Label>
                <Input
                  id="sr_no"
                  name="sr_no"
                  value={formData.sr_no}
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-full"
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="case_no" className="text-sm font-medium text-gray-700">Case No</Label>
                <Input
                  id="case_no"
                  name="case_no"
                  value={formData.case_no}
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_year" className="text-sm font-medium text-gray-700">Crime Year</Label>
                <Input
                  id="crime_year"
                  name="crime_year"
                  value={formData.crime_year}
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_section" className="text-sm font-medium text-gray-700">Crime Section</Label>
                <Input
                  id="crime_section"
                  name="crime_section"
                  value={formData.crime_section}
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_part" className="text-sm font-medium text-gray-700">Crime Part</Label>
                <Select
                  value={formData.crime_part}
                  onValueChange={(value) => setFormData({ ...formData, crime_part: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select crime part" />
                  </SelectTrigger>
                  <SelectContent>
                    {crimeParts.map((part: any) => (
                      <SelectItem
                        key={part.crime_part_id}
                        value={part.crime_part_name}
                      >
                        {part.crime_part_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_type" className="text-sm font-medium text-gray-700">Crime Type</Label>
                <Select
                  value={formData.crime_type}
                  onValueChange={(value) => setFormData({ ...formData, crime_type: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select crime type" />
                  </SelectTrigger>
                  <SelectContent>
                    {crimeTypes.map((type: any) => (
                      <SelectItem
                        key={type.crime_type_id}
                        value={type.crime_type_name}
                      >
                        {type.crime_type_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_subtype" className="text-sm font-medium text-gray-700">Crime Subtype</Label>
                <Select
                  value={formData.crime_subtype}
                  onValueChange={(value) => setFormData({ ...formData, crime_subtype: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select crime subtype" />
                  </SelectTrigger>
                  <SelectContent>
                    {crimeSubTypes.map((subtype: any) => (
                      <SelectItem
                        key={subtype.crime_subtype_id}
                        value={subtype.crime_subtype_name}
                      >
                        {subtype.crime_subtype_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="filing_date" className="text-sm font-medium text-gray-700">Filing Date</Label>
                <Input
                  id="filing_date"
                  name="filing_date"
                  value={formData.filing_date}
                  onChange={handleChange}
                  type="date"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_latitude" className="text-sm font-medium text-gray-700">Crime Latitude</Label>
                <Input
                  id="crime_latitude"
                  name="crime_latitude"
                  value={formData.crime_latitude}
                  onChange={handleChange}
                  type="number"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_longitude" className="text-sm font-medium text-gray-700">Crime Longitude</Label>
                <Input
                  id="crime_longitude"
                  name="crime_longitude"
                  value={formData.crime_longitude}
                  onChange={handleChange}
                  type="number"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_investigating_officer" className="text-sm font-medium text-gray-700">Investigating Officer</Label>
                <Select
                  value={formData.crime_investigating_officer}
                  onValueChange={(value) => setFormData({ ...formData, crime_investigating_officer: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select investigating officer" />
                  </SelectTrigger>
                  <SelectContent>
                    {policeOfficers.map((officer: any) => (
                      <SelectItem
                        key={officer.officer_id}
                        value={officer.officer_name} 
                      >
                        {officer.officer_name} ({officer.officer_designation})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_status" className="text-sm font-medium text-gray-700">Crime Status</Label>
                <Input
                  id="crime_status"
                  name="crime_status"
                  value={formData.crime_status}
                  onChange={handleChange}
                  type="text"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_outward_number" className="text-sm font-medium text-gray-700">Outward Number</Label>
                <Input
                  id="crime_outward_number"
                  name="crime_outward_number"
                  value={formData.crime_outward_number}
                  onChange={handleChange}
                  type="text"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_chargesheet_date" className="text-sm font-medium text-gray-700">Chargesheet Date</Label>
                <Input
                  id="crime_chargesheet_date"
                  name="crime_chargesheet_date"
                  value={formData.crime_chargesheet_date}
                  onChange={handleChange}
                  type="date"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_pending_reason" className="text-sm font-medium text-gray-700">Pending Reason</Label>
                <Input
                  id="crime_pending_reason"
                  name="crime_pending_reason"
                  value={formData.crime_pending_reason}
                  onChange={handleChange}
                  type="text"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_location" className="text-sm font-medium text-gray-700">Crime Location</Label>
                <Input
                  id="crime_location"
                  name="crime_location"
                  value={formData.crime_location}
                  onChange={handleChange}
                  type="text"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_property_value" className="text-sm font-medium text-gray-700">Property Value</Label>
                <Input
                  id="crime_property_value"
                  name="crime_property_value"
                  value={formData.crime_property_value}
                  onChange={handleChange}
                  type="number"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_property_recovery" className="text-sm font-medium text-gray-700">Property Recovery</Label>
                <Input
                  id="crime_property_recovery"
                  name="crime_property_recovery"
                  value={formData.crime_property_recovery}
                  onChange={handleChange}
                  type="number"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_reveal_date" className="text-sm font-medium text-gray-700">Reveal Date</Label>
                <Input
                  id="crime_reveal_date"
                  name="crime_reveal_date"
                  value={formData.crime_reveal_date}
                  onChange={handleChange}
                  type="date"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Forensic Expert Visit</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="crime_forensic_expert_visit_yes"
                      checked={formData.crime_forensic_expert_visit === true}
                      onCheckedChange={() =>
                        setFormData({ ...formData, crime_forensic_expert_visit: true })
                      }
                    />
                    <Label htmlFor="crime_forensic_expert_visit_yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="crime_forensic_expert_visit_no"
                      checked={formData.crime_forensic_expert_visit === false}
                      onCheckedChange={() =>
                        setFormData({ ...formData, crime_forensic_expert_visit: false })
                      }
                    />
                    <Label htmlFor="crime_forensic_expert_visit_no">No</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_forensic_expert_visit_date" className="text-sm font-medium text-gray-700">Forensic Expert Visit Date</Label>
                <Input
                  id="crime_forensic_expert_visit_date"
                  name="crime_forensic_expert_visit_date"
                  value={formData.crime_forensic_expert_visit_date}
                  onChange={handleChange}
                  type="date"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_detention_period" className="text-sm font-medium text-gray-700">Detention Period</Label>
                <Input
                  id="crime_detention_period"
                  name="crime_detention_period"
                  value={formData.crime_detention_period}
                  onChange={handleChange}
                  type="text"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_new_investigation_officer" className="text-sm font-medium text-gray-700">New Investigation Officer</Label>
                <Select
                  value={formData.crime_new_investigation_officer}
                  onValueChange={(value) => setFormData({ ...formData, crime_new_investigation_officer: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select new investigation officer" />
                  </SelectTrigger>
                  <SelectContent>
                    {policeOfficers.map((officer: any) => (
                      <SelectItem
                        key={officer.officer_id}
                        value={officer.officer_name}
                      >
                        {officer.officer_name} ({officer.officer_designation})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_pending_duration" className="text-sm font-medium text-gray-700">Pending Duration</Label>
                <Input
                  id="crime_pending_duration"
                  name="crime_pending_duration"
                  value={formData.crime_pending_duration}
                  onChange={handleChange}
                  type="text"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_investigation_reason" className="text-sm font-medium text-gray-700">Investigation Reason</Label>
                <Input
                  id="crime_investigation_reason"
                  name="crime_investigation_reason"
                  value={formData.crime_investigation_reason}
                  onChange={handleChange}
                  type="text"
                  className="w-full"
                />
              </div>

              
              <div className="space-y-2">
                <Label htmlFor="crime_complainant_name" className="text-sm font-medium text-gray-700">Complainant Name</Label>
                <Input
                  id="crime_complainant_name"
                  name="crime_complainant_name"
                  value={formData.crime_complainant_name}
                  onChange={handleChange}
                  type="text"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_complainant_address" className="text-sm font-medium text-gray-700">Complainant Address</Label>
                <Input
                  id="crime_complainant_address"
                  name="crime_complainant_address"
                  value={formData.crime_complainant_address}
                  onChange={handleChange}
                  type="text"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_complainant_age" className="text-sm font-medium text-gray-700">Complainant Age</Label>
                <Input
                  id="crime_complainant_age"
                  name="crime_complainant_age"
                  value={formData.crime_complainant_age}
                  onChange={handleChange}
                  type="number"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_complainant_gender" className="text-sm font-medium text-gray-700">Complainant Gender</Label>
                <Select
                  value={formData.crime_complainant_gender}
                  onValueChange={(value) => setFormData(prev => ({...prev, crime_complainant_gender: value}))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_complainant_mobile_no" className="text-sm font-medium text-gray-700">Complainant Mobile No</Label>
                <Input
                  id="crime_complainant_mobile_no"
                  name="crime_complainant_mobile_no"
                  value={formData.crime_complainant_mobile_no}
                  onChange={handleChange}
                  type="text" 
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime_occurrence_date" className="text-sm font-medium text-gray-700">Occurrence Date</Label>
                <Input
                  id="crime_occurrence_date"
                  name="crime_occurrence_date"
                  value={formData.crime_occurrence_date}
                  onChange={handleChange}
                  type="date"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Investigation Done</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="crime_investigation_done_yes"
                      checked={formData.crime_investigation_done === true}
                      onCheckedChange={() => 
                        setFormData({ ...formData, crime_investigation_done: true })
                      }
                    />
                    <Label htmlFor="crime_investigation_done_yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="crime_investigation_done_no" 
                      checked={formData.crime_investigation_done === false}
                      onCheckedChange={() =>
                        setFormData({ ...formData, crime_investigation_done: false })
                      }
                    />
                    <Label htmlFor="crime_investigation_done_no">No</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Punishment Greater Than 7 Years</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="crime_punishment_gt_7_yes"
                      checked={formData.crime_punishment_gt_7 === true}
                      onCheckedChange={() =>
                        setFormData({ ...formData, crime_punishment_gt_7: true })
                      }
                    />
                    <Label htmlFor="crime_punishment_gt_7_yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="crime_punishment_gt_7_no"
                      checked={formData.crime_punishment_gt_7 === false} 
                      onCheckedChange={() =>
                        setFormData({ ...formData, crime_punishment_gt_7: false })
                      }
                    />
                    <Label htmlFor="crime_punishment_gt_7_no">No</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">E-Sakshi Added</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="crime_e_sakshi_added_yes"
                      checked={formData.crime_e_sakshi_added === true}
                      onCheckedChange={() =>
                        setFormData({ ...formData, crime_e_sakshi_added: true })
                      }
                    />
                    <Label htmlFor="crime_e_sakshi_added_yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="crime_e_sakshi_added_no"
                      checked={formData.crime_e_sakshi_added === false}
                      onCheckedChange={() =>
                        setFormData({ ...formData, crime_e_sakshi_added: false })
                      }
                    />
                    <Label htmlFor="crime_e_sakshi_added_no">No</Label>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6 sticky bottom-0 bg-gray-50 py-4">
            <Button
              type="button"
              className="bg-gray-500 text-white"
              onClick={() => navigate('/dashboard/crime-dashboard')}
              disabled={isSubmitting || isLoading || isFetchingSrNo}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 text-white"
              disabled={isSubmitting || isLoading || isFetchingSrNo}
            >
              {isSubmitting ? 'Creating...' : 'Create Crime Record'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCrimePage