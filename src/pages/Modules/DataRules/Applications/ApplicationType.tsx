import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from "sonner"
import { Pencil, Trash2, FileType, Loader2 } from 'lucide-react'
import { format } from 'date-fns'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  createApplicationType,
  getAllApplicationTypes, 
  updateApplicationType,
  deleteApplicationType
} from '@/api'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const ApplicationType = () => {
  const { loginResponse } = useAuth()
  const [applicationTypes, setApplicationTypes] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [applicationTypeName, setApplicationTypeName] = useState('')

  const fetchApplicationTypes = async () => {
    try {
      setLoading(true)
      const response = await getAllApplicationTypes({
        station_id: loginResponse?.station_id || ''
      })
      setApplicationTypes(response.data)
    } catch (error) {
      toast.error("Failed to fetch application types")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplicationTypes()
  }, [])

  const handleAdd = () => {
    setEditingId(null)
    setApplicationTypeName('')
    setIsModalVisible(true)
  }

  const handleEdit = (record: any) => {
    setEditingId(record.application_type_id)
    setApplicationTypeName(record.application_type_name)
    setIsModalVisible(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteApplicationType({
        application_type_id: id
      })
      toast.success("Application type deleted successfully")
      fetchApplicationTypes()
    } catch (error) {
      toast.error("Failed to delete application type")
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    if (!applicationTypeName.trim()) {
      toast.error("Application type name is required")
      return
    }

    try {
      setSaving(true)
      if (editingId) {
        await updateApplicationType({
          application_type_id: editingId,
          application_type_name: applicationTypeName,
          station_id: loginResponse?.station_id || ''
        })
        toast.success("Application type updated successfully")
      } else {
        await createApplicationType({
          application_type_name: applicationTypeName,
          station_id: loginResponse?.station_id || ''
        })
        toast.success("Application type created successfully")
      }
      setIsModalVisible(false)
      fetchApplicationTypes()
    } catch (error) {
      toast.error("Operation failed")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
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
          <CardTitle className="flex items-center gap-2">
            <FileType size={20} />
            Application Types
          </CardTitle>
          <CardDescription>Manage your application types</CardDescription>
          <div className="flex justify-end">
            <Button onClick={handleAdd} variant="default">
              Add Application Type
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="font-bold">Application Type Name</TableHead>
                  <TableHead className="font-bold">Created Date</TableHead>
                  <TableHead className="font-bold w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicationTypes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8">
                      No application types found
                    </TableCell>
                  </TableRow>
                ) : (
                  applicationTypes.map((type: any) => (
                    <TableRow key={type.application_type_id}>
                      <TableCell>{type.application_type_name}</TableCell>
                      <TableCell>{format(new Date(type.created_at), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(type)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDelete(type.application_type_id)}
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

      <Dialog open={isModalVisible} onOpenChange={setIsModalVisible}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Application Type" : "Add Application Type"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Application Type Name
              </label>
              <Input
                value={applicationTypeName}
                onChange={(e) => setApplicationTypeName(e.target.value)}
                placeholder="Enter application type name"
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsModalVisible(false)} type="button" disabled={saving}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : editingId ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ApplicationType