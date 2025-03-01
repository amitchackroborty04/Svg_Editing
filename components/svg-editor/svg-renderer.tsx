"use client"

import { useCallback } from "react"
import type { PathData, SvgData } from "./types"

interface SvgRendererProps {
  svg: SvgData
  selectedPathId: string | null
  pathColors: Record<string, string>
  onPathSelect: (pathId: string) => void
}

export function SvgRenderer({ svg, selectedPathId, pathColors, onPathSelect }: SvgRendererProps) {
  const getPathColor = useCallback(
    (path: PathData) => {
      return pathColors[path.id] || path.originalFill || path.fill || "#000000"
    },
    [pathColors],
  )

  const getPathStyle = useCallback(
    (pathId: string) => {
      return {
        cursor: "pointer",
        stroke: selectedPathId === pathId ? "#000000" : "none",
        strokeWidth: selectedPathId === pathId ? 2 : 0,
        transition: "all 0.2s ease",
      }
    },
    [selectedPathId],
  )

  return (
    <svg
      width={svg.width}
      height={svg.height}
      viewBox={svg.viewBox}
     
      className="max-w-full h-full"
    >
      {svg.paths.map((path) => (
        <path
          key={path.id}
          id={path.id}
          d={path.d}
          fill={getPathColor(path)}
          style={getPathStyle(path.id)}
          onClick={() => onPathSelect(path.id)}
        />
      ))}
    </svg>
  )
}

