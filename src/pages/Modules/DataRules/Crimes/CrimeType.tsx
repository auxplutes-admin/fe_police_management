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
  createCrimeType,
  getAllCrimeTypes,
  updateCrimeType,
  deleteCrimeType
} from '@/api'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const CrimeType = () => {
  const { loginResponse } = useAuth()
  const [crimeTypes, setCrimeTypes] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [crimeTypeName, setCrimeTypeName] = useState('')

  const fetchCrimeTypes = async () => {
    try {
      setLoading(true)
      const response = await getAllCrimeTypes({
        station_id: loginResponse?.station_id || ''
      })
      setCrimeTypes(response.data)
    } catch (error) {
      toast.error("Failed to fetch crime types")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCrimeTypes()
  }, [])

  const handleAdd = () => {
    setEditingId(null)
    setCrimeTypeName('')
    setIsModalVisible(true)
  }

  const handleEdit = (record: any) => {
    setEditingId(record.crime_type_id)
    setCrimeTypeName(record.crime_type_name)
    setIsModalVisible(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCrimeType({
        crime_type_id: id
      })
      toast.success("Crime type deleted successfully")
      fetchCrimeTypes()
    } catch (error) {
      toast.error("Failed to delete crime type")
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    if (!crimeTypeName.trim()) {
      toast.error("Crime type name is required")
      return
    }

    try {
      setSaving(true)
      if (editingId) {
        await updateCrimeType({
          crime_type_id: editingId,
          crime_type_name: crimeTypeName,
          station_id: loginResponse?.station_id || ''
        })
        toast.success("Crime type updated successfully")
      } else {
        await createCrimeType({
          crime_type_name: crimeTypeName,
          station_id: loginResponse?.station_id || ''
        })
        toast.success("Crime type created successfully")
      }
      setIsModalVisible(false)
      fetchCrimeTypes()
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
            Crime Types
          </CardTitle>
          <CardDescription>Manage your crime types</CardDescription>
          <div className="flex justify-end">
            <Button onClick={handleAdd} variant="default">
              Add Crime Type
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="font-bold">Crime Type Name</TableHead>
                  <TableHead className="font-bold">Created Date</TableHead>
                  <TableHead className="font-bold w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {crimeTypes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8">
                      No crime types found
                    </TableCell>
                  </TableRow>
                ) : (
                  crimeTypes.map((type: any) => (
                    <TableRow key={type.crime_type_id}>
                      <TableCell>{type.crime_type_name}</TableCell>
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
                            onClick={() => handleDelete(type.crime_type_id)}
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
              {editingId ? "Edit Crime Type" : "Add Crime Type"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Crime Type Name
              </label>
              <Input
                value={crimeTypeName}
                onChange={(e) => setCrimeTypeName(e.target.value)}
                placeholder="Enter crime type name"
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

export default CrimeType
