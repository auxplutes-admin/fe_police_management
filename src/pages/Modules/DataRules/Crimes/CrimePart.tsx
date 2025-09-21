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
  createCrimePart,
  getAllCrimeParts,
  updateCrimePart,
  deleteCrimePart
} from '@/api'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const CrimePart = () => {
  const { loginResponse } = useAuth()
  const [crimeParts, setCrimeParts] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [crimePartName, setCrimePartName] = useState('')

  const fetchCrimeParts = async () => {
    try {
      setLoading(true)
      const response = await getAllCrimeParts({
        station_id: loginResponse?.station_id || ''
      })
      setCrimeParts(response.data)
    } catch (error) {
      toast.error("Failed to fetch crime parts")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCrimeParts()
  }, [])

  const handleAdd = () => {
    setEditingId(null)
    setCrimePartName('')
    setIsModalVisible(true)
  }

  const handleEdit = (record: any) => {
    setEditingId(record.crime_part_id)
    setCrimePartName(record.crime_part_name)
    setIsModalVisible(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCrimePart({
        crime_part_id: id
      })
      toast.success("Crime part deleted successfully")
      fetchCrimeParts()
    } catch (error) {
      toast.error("Failed to delete crime part")
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    if (!crimePartName.trim()) {
      toast.error("Crime part name is required")
      return
    }

    try {
      setSaving(true)
      if (editingId) {
        await updateCrimePart({
          crime_part_id: editingId,
          crime_part_name: crimePartName,
          station_id: loginResponse?.station_id || ''
        })
        toast.success("Crime part updated successfully")
      } else {
        await createCrimePart({
          crime_part_name: crimePartName,
          station_id: loginResponse?.station_id || ''
        })
        toast.success("Crime part created successfully")
      }
      setIsModalVisible(false)
      fetchCrimeParts()
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
            Crime Parts
          </CardTitle>
          <CardDescription>Manage your crime parts</CardDescription>
          <div className="flex justify-end">
            <Button onClick={handleAdd} variant="default">
              Add Crime Part
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="font-bold">Crime Part Name</TableHead>
                  <TableHead className="font-bold">Created Date</TableHead>
                  <TableHead className="font-bold w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {crimeParts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8">
                      No crime parts found
                    </TableCell>
                  </TableRow>
                ) : (
                  crimeParts.map((part: any) => (
                    <TableRow key={part.crime_part_id}>
                      <TableCell>{part.crime_part_name}</TableCell>
                      <TableCell>{format(new Date(part.created_at), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(part)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDelete(part.crime_part_id)}
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
              {editingId ? "Edit Crime Part" : "Add Crime Part"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Crime Part Name
              </label>
              <Input
                value={crimePartName}
                onChange={(e) => setCrimePartName(e.target.value)}
                placeholder="Enter crime part name"
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

export default CrimePart
