import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { getAllPoliceOfficersByStationId, createPoliceOfficer } from '@/api'
import { Input } from '@/components/ui/input'
import { toast } from "sonner"
import { Eye, Pencil, Trash2, Users, Loader2, Plus } from 'lucide-react'
import { format } from 'date-fns'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

const OfficerManagementPage: React.FC = () => {
  const { loginResponse } = useAuth()
  const navigate = useNavigate()
  const [officers, setOfficers] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [newOfficer, setNewOfficer] = useState({
    officer_name: '',
    officer_username: '',
    officer_password: '',
    officer_designation: '',
    officer_badge_number: '',
    officer_mobile_number: '',
    officer_email: '',
  })

  const fetchOfficers = async () => {
    try {
      setLoading(true)
      const response = await getAllPoliceOfficersByStationId({
        station_id: loginResponse?.station_id || '',
        page: 1,
        limit: 10
      })
      console.log(response)
      setOfficers(response.data)
    } catch (error) {
      toast.error("Failed to fetch officers")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOfficers()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setNewOfficer(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleCancel = () => {
    setNewOfficer({
      officer_name: '',
      officer_username: '',
      officer_password: '',
      officer_designation: '',
      officer_badge_number: '',
      officer_mobile_number: '',
      officer_email: '',
    })
    setIsSheetOpen(false)
  }

  const handleSaveOfficer = async () => {
    try {
      setSaving(true)
      const payload = {
        station_id: loginResponse?.station_id || '',
        officer_name: newOfficer.officer_name,
        officer_username: newOfficer.officer_username,
        officer_password: newOfficer.officer_password,
        officer_designation: newOfficer.officer_designation,
        officer_badge_number: newOfficer.officer_badge_number,
        officer_mobile_number: Number(newOfficer.officer_mobile_number),
        officer_email: newOfficer.officer_email,
        officer_status: 'Active',
      }

      await createPoliceOfficer(payload)
      toast.success('Officer created successfully')
      setIsSheetOpen(false)
      fetchOfficers()
      setNewOfficer({
        officer_name: '',
        officer_username: '',
        officer_password: '',
        officer_designation: '',
        officer_badge_number: '',
        officer_mobile_number: '',
        officer_email: '',
      })
    } catch (error) {
      toast.error('Failed to create officer')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  const handleViewOfficer = (officer: any) => {
    navigate(`/dashboard/officer-dashboard/view/${officer.officer_id}`)
  }

  return (
    <div className="space-y-2">
      <div className="w-full rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} />
            Police Officers
          </CardTitle>
          <div className="flex justify-end">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="default">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Officer
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-[720px]">
                <SheetHeader>
                  <SheetTitle>Add New Officer</SheetTitle>
                  <SheetDescription>
                    Fill in the details to add a new police officer.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="officer_name">Officer Name</Label>
                        <Input id="officer_name" value={newOfficer.officer_name} onChange={handleInputChange} placeholder="Enter officer name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="officer_username">Username</Label>
                        <Input id="officer_username" value={newOfficer.officer_username} onChange={handleInputChange} placeholder="Enter username" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="officer_password">Password</Label>
                        <Input id="officer_password" value={newOfficer.officer_password} onChange={handleInputChange} type="password" placeholder="Enter password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="officer_badge_number">Badge Number</Label>
                        <Input id="officer_badge_number" value={newOfficer.officer_badge_number} onChange={handleInputChange} placeholder="Enter badge number" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="officer_designation">Designation</Label>
                        <Input id="officer_designation" value={newOfficer.officer_designation} onChange={handleInputChange} placeholder="Enter designation" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="officer_mobile_number">Mobile Number</Label>
                        <Input id="officer_mobile_number" value={newOfficer.officer_mobile_number} onChange={handleInputChange} placeholder="Enter mobile number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="officer_email">Email</Label>
                        <Input id="officer_email" value={newOfficer.officer_email} onChange={handleInputChange} type="email" placeholder="Enter email address" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={handleCancel} disabled={saving}>Cancel</Button>
                    <Button onClick={handleSaveOfficer} disabled={saving}>
                     {
                        saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />  : "Save Officer"
                     }
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="font-bold">Name</TableHead>
                  <TableHead className="font-bold">Badge Number</TableHead>
                  <TableHead className="font-bold">Designation</TableHead>
                  <TableHead className="font-bold">Mobile</TableHead>
                  <TableHead className="font-bold">Email</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="font-bold">Joined Date</TableHead>
                  <TableHead className="font-bold w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {officers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No officers found
                    </TableCell>
                  </TableRow>
                ) : (
                  officers.map((officer: any) => (
                    <TableRow key={officer.officer_id}>
                      <TableCell>{officer.officer_name}</TableCell>
                      <TableCell>{officer.officer_badge_number}</TableCell>
                      <TableCell>{officer.officer_designation}</TableCell>
                      <TableCell>{officer.officer_mobile_number}</TableCell>
                      <TableCell>{officer.officer_email}</TableCell>
                      <TableCell>{officer.officer_status}</TableCell>
                      <TableCell>{format(new Date(officer.officer_joining_date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewOfficer(officer)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </div>
    </div>
  )
}

export default OfficerManagementPage
