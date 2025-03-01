"use client"

import { useState } from "react"
import { TileSelection } from "@/components/tile-selection"
import { ColorEditor } from "@/components/svg-editor/color-editor"
// import { ViewPanel } from "@/components/view-panel"
import { parseSvgString } from "@/components/svg-editor/svg-parser"
import type { SvgData } from "@/components/svg-editor/types"
import EnvironmentSelector from "@/components/view-panel"

interface Tile {
  id: string
  name: string
  collection: string
  svg: string
}

export default function Page() {
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null)
  const [currentSvg, setCurrentSvg] = useState<SvgData | null>(null)
 
  
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>("kitchen")
  const [showBorders, setShowBorders] = useState<boolean>(false)
  const [pathColors, setPathColors] = useState<Record<string, string>>({})

  const handleTileSelect = (tile: Tile) => {
    setSelectedTile(tile)
    if (tile.svg) {
      setCurrentSvg(parseSvgString(tile.svg, tile.id))
    }
  }

  const handleColorSelect = (pathId: string, color: { id: string; color: string; name: string }) => {
    setPathColors((prev) => ({
      ...prev,
      [pathId]: color.color,
    }))
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 flex overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full">
          {/* Tile Selection Panel */}
          <div className=" border-r border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-center bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                TILE SELECTION
              </h2>
              <p className="text-xs text-center text-gray-500 mt-1">(SCROLL FOR MORE OPTIONS)</p>
            </div>
            <TileSelection onTileSelect={handleTileSelect} selectedTile={selectedTile} />
          </div>

          {/* Color Editor Panel */}
          <div className=" order-r border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-center bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                COLOR EDITOR
              </h2>
            </div>
            {currentSvg ? (
              <ColorEditor
                svg={currentSvg}
                showBorders={showBorders}
                setShowBorders={setShowBorders}
                onColorSelect={handleColorSelect}
              />
            ) : (
              <div className="p-4 text-center text-gray-500">Select a tile to edit its colors</div>
            )}
          </div>

          {/* View Panel */}
          <div className=" overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-center bg-gradient-to-r from-green-500 to-yellow-500 bg-clip-text text-transparent">
                VIEW
              </h2>
            </div>
            {/* <ViewPanel
              selectedTile={selectedTile}
              currentSvg={currentSvg}
              selectedEnvironment={selectedEnvironment}
              setSelectedEnvironment={setSelectedEnvironment}
              pathColors={pathColors}
              showBorders={showBorders}
            /> */}




            <EnvironmentSelector currentSvg={currentSvg} />
          </div>
        </div>
      </div>
    </div>
  ) 
}

