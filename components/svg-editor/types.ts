export interface PathData {
  id: string
  d: string
  fill?: string
  originalFill?: string
}

export interface SvgData {
  id: string
  name: string
  viewBox: string
  width: string
  height: string
  paths: PathData[]
}

export interface ColorData {
  id: string
  color: string
  name: string
}

