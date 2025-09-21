import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from "sonner"
import { Pencil, Trash2, FileType, Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  getAllCrimeTypes,
  createCrimeSubType,
  getAllCrimeSubTypes,
  updateCrimeSubType, 
  deleteCrimeSubType
} from '@/api'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const CrimeSubType = () => {
  const { loginResponse } = useAuth()
  const [crimeSubTypes, setCrimeSubTypes] = useState([])
  const [crimeTypes, setCrimeTypes] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [crimeSubTypeName, setCrimeSubTypeName] = useState('')
  const [crimeTypeId, setCrimeTypeId] = useState('')
  const [crimeTypeName, setCrimeTypeName] = useState('')

  const fetchCrimeTypes = async () => {
    try {
      const response = await getAllCrimeTypes({
        station_id: loginResponse?.station_id || ''
      })
      setCrimeTypes(response.data)
    } catch (error) {
      toast.error("Failed to fetch crime types")
    }
  }

  const fetchCrimeSubTypes = async () => {
    try {
      setLoading(true)
      const response = await getAllCrimeSubTypes({
        station_id: loginResponse?.station_id || ''
      })
      setCrimeSubTypes(response.data)
    } catch (error) {
      toast.error("Failed to fetch crime sub types")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCrimeSubTypes()
    fetchCrimeTypes()
  }, [])

  const handleAdd = () => {
    setEditingId(null)
    setCrimeSubTypeName('')
    setCrimeTypeId('')
    setCrimeTypeName('')
    setIsModalVisible(true)
  }

  const handleEdit = (record: any) => {
    setEditingId(record.crime_subtype_id)
    setCrimeSubTypeName(record.crime_subtype_name)
    setCrimeTypeId(record.crime_type_id)
    setCrimeTypeName(record.crime_type_name)
    setIsModalVisible(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCrimeSubType({
        crime_subtype_id: id
      })
      toast.success("Crime sub type deleted successfully")
      fetchCrimeSubTypes()
    } catch (error) {
      toast.error("Failed to delete crime sub type")
    }
  }

  const handleCrimeTypeChange = (value: string) => {
    const selectedType = crimeTypes.find((type: any) => type.crime_type_id === value)
    if (selectedType) {
      setCrimeTypeId(selectedType.crime_type_id)
      setCrimeTypeName(selectedType.crime_type_name)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    if (!crimeSubTypeName.trim()) {
      toast.error("Crime sub type name is required")
      return
    }

    if (!crimeTypeId.trim()) {
      toast.error("Crime type is required")
      return
    }

    try {
      setSaving(true)
      if (editingId) {
        await updateCrimeSubType({
          crime_subtype_id: editingId,
          crime_type_id: crimeTypeId,
          crime_type_name: crimeTypeName,
          crime_subtype_name: crimeSubTypeName,
          station_id: loginResponse?.station_id || ''
        })
        toast.success("Crime sub type updated successfully")
      } else {
        await createCrimeSubType({
          crime_type_id: crimeTypeId,
          crime_type_name: crimeTypeName,
          crime_subtype_name: crimeSubTypeName,
          station_id: loginResponse?.station_id || ''
        })
        toast.success("Crime sub type created successfully")
      }
      setIsModalVisible(false)
      fetchCrimeSubTypes()
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
            Crime Sub Types
          </CardTitle>
          <CardDescription>Manage your crime sub types</CardDescription>
          <div className="flex justify-end">
            <Button onClick={handleAdd} variant="default">
              Add Crime Sub Type
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="font-bold">Crime Type</TableHead>
                  <TableHead className="font-bold">Crime Sub Type Name</TableHead>
                  <TableHead className="font-bold">Created Date</TableHead>
                  <TableHead className="font-bold w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {crimeSubTypes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      No crime sub types found
                    </TableCell>
                  </TableRow>
                ) : (
                  crimeSubTypes.map((type: any) => (
                    <TableRow key={type.crime_subtype_id}>
                      <TableCell>{type.crime_type_name}</TableCell>
                      <TableCell>{type.crime_subtype_name}</TableCell>
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
                            onClick={() => handleDelete(type.crime_subtype_id)}
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
              {editingId ? "Edit Crime Sub Type" : "Add Crime Sub Type"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Crime Type
              </label>
              <Select
                value={crimeTypeId}
                onValueChange={handleCrimeTypeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select crime type" />
                </SelectTrigger>
                <SelectContent>
                  {crimeTypes.map((type: any) => (
                    <SelectItem 
                      key={type.crime_type_id} 
                      value={type.crime_type_id}
                    >
                      {type.crime_type_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Crime Sub Type Name
              </label>
              <Input
                value={crimeSubTypeName}
                onChange={(e) => setCrimeSubTypeName(e.target.value)}
                placeholder="Enter crime sub type name"
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

export default CrimeSubType
