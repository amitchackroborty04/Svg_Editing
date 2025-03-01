"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, X } from "lucide-react"
import Svg from "../svg"

export interface TileColor {
  id: string
  name: string
  color: string
  hex?: string
}

interface ColorEditorProps {
  showBorders: boolean
  setShowBorders: (show: boolean) => void
  onColorSelect?: (color: TileColor) => void
}

export function ColorEditor({ showBorders, setShowBorders, onColorSelect }: ColorEditorProps) {
  // Track all colors used in the SVG
  const [selectedColors, setSelectedColors] = useState<TileColor[]>([])

  // Track which path is currently selected
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null)

  // Map of path IDs to their colors
  const [pathColors, setPathColors] = useState<Record<string, string>>({
    "middle-right": "#9A2D2F", // Initialize with the default red color
  })

  const handlePathSelect = (pathId: string) => {
    setSelectedPathId(pathId)
  }

  const handleColorSelect = (color: string) => {
    if (!selectedPathId) return

    // Update the color for the selected path
    setPathColors((prev) => ({
      ...prev,
      [selectedPathId]: color,
    }))

    // Add to selected colors if not already present
    if (!selectedColors.some((c) => c.color === color)) {
      const newColor = { id: color, name: `Color ${color}`, color, hex: color }
      setSelectedColors((prev) => [...prev, newColor])

      // Call the parent's onColorSelect if provided
      if (onColorSelect) {
        onColorSelect(newColor)
      }
    }
  }

  const handleRemoveColor = (colorToRemove: string) => {
    // Remove this color from all paths that use it
    const updatedPathColors = { ...pathColors }

    Object.keys(updatedPathColors).forEach((pathId) => {
      if (updatedPathColors[pathId] === colorToRemove) {
        delete updatedPathColors[pathId]
      }
    })

    setPathColors(updatedPathColors)

    // Remove from selected colors
    setSelectedColors((prev) => prev.filter((c) => c.color !== colorToRemove))
  }

  // Get the current color of the selected path
  const selectedPathColor = selectedPathId ? pathColors[selectedPathId] : null

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        {/* SVG Preview */}
        <div className="border border-gray-200 rounded-md overflow-hidden flex justify-center items-center p-4">
          <Svg selectedPathId={selectedPathId} onPathSelect={handlePathSelect} pathColors={pathColors} />
        </div>

        {/* Selected Path Info */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">SELECTED PATH:</h3>
          <div className="p-2 bg-gray-100 rounded">
            {selectedPathId ? (
              <div className="flex items-center justify-between">
                <span>{selectedPathId}</span>
                <div
                  className="w-6 h-6 rounded-sm border border-gray-300"
                  style={{ backgroundColor: pathColors[selectedPathId] || "#FFFFFF" }}
                />
              </div>
            ) : (
              <span className="text-gray-500">Click on a path to select it</span>
            )}
          </div>
        </div>

        {/* Border Controls */}
        <div className="space-y-2">
          <Button
            variant={showBorders ? "default" : "outline"}
            className="w-full"
            onClick={() => setShowBorders(!showBorders)}
          >
            {showBorders ? (
              <>
                <X className="mr-2 h-4 w-4" />
                Remove Borders
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add Borders
              </>
            )}
          </Button>
        </div>

        {/* Selected Colors */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">COLORS USED:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedColors.map((color) => (
              <div
                key={color.id}
                className="w-8 h-8 rounded border border-gray-200 cursor-pointer relative group"
                style={{ backgroundColor: color.color }}
                onClick={() => handleRemoveColor(color.color)}
                title="Click to remove"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20">
                  <X className="h-4 w-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Color Palette */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Select Color:</h3>
          <div className="grid grid-cols-8 gap-1">
            {colorPalette.map((color, index) => (
              <button
                key={index}
                className={`w-6 h-6 rounded-sm border transition-transform hover:scale-110 ${
                  selectedPathColor === color ? "border-black ring-2 ring-black/20" : "border-gray-200"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
                disabled={!selectedPathId}
              />
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

// Color palette data
const colorPalette = [
  "#f5f5f0",
  "#e6e6d8",
  "#d8d8c0",
  "#ccccb3",
  "#bfbfa8",
  "#b3b39e",
  "#a6a693",
  "#999989",
  "#8c8c7f",
  "#000000",
  "#595959",
  "#404040",
  "#262626",
  "#666666",
  "#808080",
  "#999999",
  "#d9e6f2",
  "#c6d9e6",
  "#b3ccd9",
  "#a0bfcc",
  "#8cb3bf",
  "#79a6b3",
  "#6699a6",
  "#538099",
  "#d9e6d9",
  "#c6d9c6",
  "#b3ccb3",
  "#a0bfa0",
  "#8cb38c",
  "#79a679",
  "#669966",
  "#538053",
  "#f2d9d9",
  "#e6c6c6",
  "#d9b3b3",
  "#cca0a0",
  "#bf8c8c",
  "#b37979",
  "#a66666",
  "#995353",
  "#f2e6d9",
  "#e6d9c6",
  "#d9ccb3",
  "#ccbfa0",
  "#bfb38c",
  "#b3a679",
  "#a69966",
  "#998c53",
]

