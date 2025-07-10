import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

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

interface PumpModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (pumpData: any) => void
  title: string
  pump?: Pump
}

const PumpModal: React.FC<PumpModalProps> = ({ isOpen, onClose, onSave, title, pump }) => {
  const [name, setName] = useState(pump?.name || "")
  const [type, setType] = useState(pump?.type || "")
  const [area, setArea] = useState(pump?.area || "")
  const [offset, setOffset] = useState(pump?.offset || "")
  const [flowUnit, setFlowUnit] = useState(pump?.flowUnit || "GPM")
  const [latitude, setLatitude] = useState(pump?.latitude?.toString() || "")
  const [flowRate, setFlowRate] = useState(pump?.flowRate?.toString() || "")
  const [longitude, setLongitude] = useState(pump?.longitude?.toString() || "")
  const [minPressure, setMinPressure] = useState(pump?.minPressure?.toString() || "")
  const [maxPressure, setMaxPressure] = useState(pump?.maxPressure?.toString() || "")
  const [currentPressure, setCurrentPressure] = useState(pump?.currentPressure?.toString() || "")

  if (!isOpen) return null

  const handleSubmit = () => {
    const pumpData = {
      name,
      type,
      area,
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
      flowRate: Number.parseFloat(flowRate),
      flowUnit,
      offset,
      currentPressure: Number.parseFloat(currentPressure),
      minPressure: Number.parseFloat(minPressure),
      maxPressure: Number.parseFloat(maxPressure),
    }
    onSave(pumpData)
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white-active">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Pump Name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Type"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <input
              type="text"
              placeholder="Area"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
            <input
              type="number"
              placeholder="Latitude"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
            <input
              type="number"
              placeholder="Longitude"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
            <input
              type="number"
              placeholder="Flow Rate"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={flowRate}
              onChange={(e) => setFlowRate(e.target.value)}
            />
            <input
              type="text"
              placeholder="Flow Unit"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={flowUnit}
              onChange={(e) => setFlowUnit(e.target.value)}
            />
            <input
              type="text"
              placeholder="Offset"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={offset}
              onChange={(e) => setOffset(e.target.value)}
            />
            <input
              type="number"
              placeholder="Current Pressure"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={currentPressure}
              onChange={(e) => setCurrentPressure(e.target.value)}
            />
            <input
              type="number"
              placeholder="Min Pressure"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={minPressure}
              onChange={(e) => setMinPressure(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Pressure"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={maxPressure}
              onChange={(e) => setMaxPressure(e.target.value)}
            />
          </div>
          <div className="items-center px-4 py-3">
            <Button className="px-4 py-2 bg-blue-500 text-white-active text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300" onClick={handleSubmit} > Save </Button>
            <Button className="ml-2 px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300" onClick={onClose} > Cancel </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PumpModal