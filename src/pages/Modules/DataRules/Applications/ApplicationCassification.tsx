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
  createApplicationClassification,
  getAllApplicationClassifications,
  updateApplicationClassification, 
  deleteApplicationClassification
} from '@/api'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const ApplicationClassification = () => {
  const { loginResponse } = useAuth()
  const [applicationClassifications, setApplicationClassifications] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [classificationName, setClassificationName] = useState('')

  const fetchClassifications = async () => {
    try {
      setLoading(true)
      const response = await getAllApplicationClassifications({
        station_id: loginResponse?.station_id || ''
      })
      setApplicationClassifications(response.data)
    } catch (error) {
      toast.error("Failed to fetch classifications")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClassifications()
  }, [])

  const handleAdd = () => {
    setEditingId(null)
    setClassificationName('')
    setIsModalVisible(true)
  }

  const handleEdit = (record: any) => {
    setEditingId(record.application_classification_id)
    setClassificationName(record.application_classification_name)
    setIsModalVisible(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteApplicationClassification({
        application_classification_id: id
      })
      toast.success("Classification deleted successfully")
      fetchClassifications()
    } catch (error) {
      toast.error("Failed to delete classification")
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    if (!classificationName.trim()) {
      toast.error("Classification name is required")
      return
    }

    try {
      setSaving(true)
      if (editingId) {
        await updateApplicationClassification({
          application_classification_id: editingId,
          application_classification_name: classificationName,
          station_id: loginResponse?.station_id || ''
        })
        toast.success("Classification updated successfully")
      } else {
        await createApplicationClassification({
          application_classification_name: classificationName,
          station_id: loginResponse?.station_id || ''
        })
        toast.success("Classification created successfully")
      }
      setIsModalVisible(false)
      fetchClassifications()
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
            Application Classifications
          </CardTitle>
          <CardDescription>Manage your application classifications</CardDescription>
          <div className="flex justify-end">
            <Button onClick={handleAdd} variant="default">
              Add Classification
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="font-bold">Classification Name</TableHead>
                  <TableHead className="font-bold">Created Date</TableHead>
                  <TableHead className="font-bold w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicationClassifications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8">
                      No classifications found
                    </TableCell>
                  </TableRow>
                ) : (
                  applicationClassifications.map((classification: any) => (
                    <TableRow key={classification.application_classification_id}>
                      <TableCell>{classification.application_classification_name}</TableCell>
                      <TableCell>{format(new Date(classification.created_at), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(classification)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(classification.application_classification_id)}
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
              {editingId ? "Edit Classification" : "Add Classification"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Classification Name
              </label>
              <Input
                value={classificationName}
                onChange={(e) => setClassificationName(e.target.value)}
                placeholder="Enter classification name"
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

export default ApplicationClassification