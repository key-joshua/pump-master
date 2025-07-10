"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Search, Filter, Trash2, Bell, Plus, Edit } from "lucide-react"

import { Input } from "@/components/ui/input"
import PumpModal from "@/components/PumpModal"
import { Button } from "@/components/ui/button"
import { authVerify } from "@/libs/utils/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface User {
  id?: number
  email?: string
  username?: string
  profile_picture?: string
}

interface Pump {
  id: number
  name: string
  type: string
  area: string
  latitude: number
  longitude: number
  flowRate: number
  flowUnit: string
  offset: string
  currentPressure: number
  minPressure: number
  maxPressure: number
}

async function fetchPumps(): Promise<Pump[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return [
    {
      id: 1,
      name: "Pump 1",
      type: "Centrifugal",
      area: "Area A",
      latitude: 34.0522,
      longitude: -118.2437,
      flowRate: 1000,
      flowUnit: "GPM",
      offset: "5 sec",
      currentPressure: 150,
      minPressure: 120,
      maxPressure: 180,
    },
    {
      id: 2,
      name: "Pump 2",
      type: "Submersible",
      area: "Area B",
      latitude: 34.0522,
      longitude: -118.2437,
      flowRate: 800,
      flowUnit: "GPM",
      offset: "3 sec",
      currentPressure: 130,
      minPressure: 100,
      maxPressure: 160,
    },
    {
      id: 3,
      name: "Pump 3",
      type: "Diaphragm",
      area: "Area C",
      latitude: 34.0522,
      longitude: -118.2437,
      flowRate: 800,
      flowUnit: "GPM",
      offset: "2 sec",
      currentPressure: 110,
      minPressure: 80,
      maxPressure: 140,
    },
    {
      id: 4,
      name: "Pump 4",
      type: "Rotary",
      area: "Area D",
      latitude: 34.0522,
      longitude: -118.2437,
      flowRate: 400,
      flowUnit: "GPM",
      offset: "1 sec",
      currentPressure: 90,
      minPressure: 60,
      maxPressure: 120,
    },
    {
      id: 5,
      name: "Pump 5",
      type: "Peristaltic",
      area: "Area E",
      latitude: 34.0522,
      longitude: -118.2437,
      flowRate: 200,
      flowUnit: "GPM",
      offset: "0 sec",
      currentPressure: 70,
      minPressure: 40,
      maxPressure: 100,
    },
    {
      id: 6,
      name: "Pump 6",
      type: "Centrifugal",
      area: "Area F",
      latitude: 34.0522,
      longitude: -118.2437,
      flowRate: 1200,
      flowUnit: "GPM",
      offset: "6 ft",
      currentPressure: 170,
      minPressure: 140,
      maxPressure: 200,
    },
    {
      id: 7,
      name: "Pump 7",
      type: "Submersible",
      area: "Area G",
      latitude: 34.0522,
      longitude: -118.2437,
      flowRate: 1000,
      flowUnit: "GPM",
      offset: "4 sec",
      currentPressure: 150,
      minPressure: 120,
      maxPressure: 180,
    },
    {
      id: 8,
      name: "Pump 8",
      type: "Diaphragm",
      area: "Area H",
      latitude: 34.0522,
      longitude: -118.2437,
      flowRate: 800,
      flowUnit: "GPM",
      offset: "3 sec",
      currentPressure: 130,
      minPressure: 100,
      maxPressure: 160,
    },
    {
      id: 9,
      name: "Pump 9",
      type: "Rotary",
      area: "Area I",
      latitude: 34.0522,
      longitude: -118.2437,
      flowRate: 600,
      flowUnit: "GPM",
      offset: "2 sec",
      currentPressure: 110,
      minPressure: 80,
      maxPressure: 140,
    },
    {
      id: 10,
      name: "Pump 10",
      type: "Peristaltic",
      area: "Area J",
      latitude: 34.0522,
      longitude: -118.2437,
      flowRate: 400,
      flowUnit: "GPM",
      offset: "1 sec",
      currentPressure: 90,
      minPressure: 60,
      maxPressure: 120,
    },
  ]
}

const Dashboard = () => {
  const [user, setUsr] = useState<User>({});
  const [loading, setLoading] = useState(true)
  const [pumps, setPumps] = useState<Pump[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedPumps, setSelectedPumps] = useState<number[]>([])
  const [editingPump, setEditingPump] = useState<Pump | null>(null)

  useEffect(() => {
    const getUserProfile = async () => {
      const { user }: any = await authVerify();
      setUsr(user);
    }

    getUserProfile();
  }, []);

  const handleSelectPump = (pumpId: number) => {
    setSelectedPumps((prev) => (prev.includes(pumpId) ? prev.filter((id) => id !== pumpId) : [...prev, pumpId]))
  }

  const handleSelectAll = () => {
    const filteredPumps = pumps.filter((pump) => pump.name.toLowerCase().includes(searchTerm.toLowerCase()) || pump.type.toLowerCase().includes(searchTerm.toLowerCase()) || pump.area.toLowerCase().includes(searchTerm.toLowerCase()))
    if (selectedPumps.length === filteredPumps.length) {
      setSelectedPumps([])
    } else {
      setSelectedPumps(filteredPumps.map((pump) => pump.id))
    }
  }

  const filteredPumps = pumps.filter(
    (pump) =>
      pump.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pump.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pump.area.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const isAllSelected = selectedPumps.length === filteredPumps.length && filteredPumps.length > 0
  const isIndeterminate = selectedPumps.length > 0 && selectedPumps.length < filteredPumps.length

  useEffect(() => {
    const loadPumps = async () => {
      try {
        const data = await fetchPumps()
        setPumps(data)
      } catch (error) {
        console.error("Failed to fetch pumps:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPumps()
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white-active border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white-active font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">PumpMaster</span>
            </div>
            <nav className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900"> Dashboard </a>
              <a href="#" className="text-gray-900 font-medium"> Pumps </a>
              <a href="#" className="text-gray-600 hover:text-gray-900"> Reports </a>
              <a href="#" className="text-gray-600 hover:text-gray-900"> Alerts </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search" className="pl-10 w-64" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <Button variant="ghost" size="icon"> <Bell className="w-5 h-5" /> </Button>
            <Avatar> <AvatarImage src={user?.profile_picture || "/admin-avatar.png" } /> <AvatarFallback>{user?.username?.slice(0, 2)}</AvatarFallback> </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Pumps</h1>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAddModal(true)}> <Plus className="w-4 h-4 mr-2" /> New Pump </Button>
        </div>

        {/* Table Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon"> <Search className="w-4 h-4" /> </Button>
            <Button variant="ghost" size="icon"> <Filter className="w-4 h-4" /> </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="bg-green-50 border-green-600 text-green-700 hover:bg-green-100 hover:border-green-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed"
              disabled={selectedPumps.length !== 1}
              onClick={() => { const pump = pumps.find((p) => p.id === selectedPumps[0]); if (pump) { setEditingPump(pump); setShowEditModal(true) } }}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="destructive"
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={selectedPumps.length === 0}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete {selectedPumps.length > 0 && `(${selectedPumps.length})`}
            </Button>
          </div>
        </div>

        {/* Pumps Table */}
        <div className="bg-white-active rounded-lg border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading pumps...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12">
                    <input type="checkbox" checked={isAllSelected} ref={(el) => { if (el) el.indeterminate = isIndeterminate }} onChange={handleSelectAll} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </TableHead>
                  <TableHead className="font-medium text-gray-700">Pump Name</TableHead>
                  <TableHead className="font-medium text-gray-700">Type</TableHead>
                  <TableHead className="font-medium text-gray-700">Area/Block</TableHead>
                  <TableHead className="font-medium text-gray-700">Latitude</TableHead>
                  <TableHead className="font-medium text-gray-700">Longitude</TableHead>
                  <TableHead className="font-medium text-gray-700">Flow Rate</TableHead>
                  <TableHead className="font-medium text-gray-700">Offset</TableHead>
                  <TableHead className="font-medium text-gray-700">Current Pressure</TableHead>
                  <TableHead className="font-medium text-gray-700">Min Pressure</TableHead>
                  <TableHead className="font-medium text-gray-700">Max Pressure</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPumps.map((pump) => (
                  <TableRow key={pump.id} className="hover:bg-gray-50">
                    <TableCell>
                      <input type="checkbox" checked={selectedPumps.includes(pump.id)} onChange={() => handleSelectPump(pump.id)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    </TableCell>
                    <TableCell className="font-medium">{pump.name}</TableCell>
                    <TableCell className="text-blue-600">{pump.type}</TableCell>
                    <TableCell className="text-blue-600">{pump.area}</TableCell>
                    <TableCell>{pump.latitude}</TableCell>
                    <TableCell>{pump.longitude}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{pump.flowRate}</div>
                        <div className="text-gray-500">{pump.flowUnit}</div>
                      </div>
                    </TableCell>
                    <TableCell>{pump.offset}</TableCell>
                    <TableCell>{pump.currentPressure} psi</TableCell>
                    <TableCell>{pump.minPressure} psi</TableCell>
                    <TableCell>{pump.maxPressure} psi</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Add Pump Modal */}
        {showAddModal && (
          <PumpModal
            title="Add New Pump"
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onSave={(pumpData) => { setShowAddModal(false) }}
          />
        )}

        {/* Edit Pump Modal */}
        {showEditModal && editingPump && (
          <PumpModal
            title="Edit Pump"
            pump={editingPump}
            isOpen={showEditModal}
            onClose={() => { setShowEditModal(false); setEditingPump(null) }}
            onSave={(pumpData) => { setShowEditModal(false); setEditingPump(null) }}
          />
        )}
      </main>
    </div>
  )
}

export default Dashboard;
