"use client"

import { useState } from "react"
import { ColorEditor } from "./color-editor"

export default function SvgEditor() {
  const [showBorders, setShowBorders] = useState(false)

  return (
    <div className="w-full max-w-md mx-auto h-[600px] border rounded-lg shadow-sm">
      <ColorEditor showBorders={showBorders} setShowBorders={setShowBorders} />
    </div>
  )
}

