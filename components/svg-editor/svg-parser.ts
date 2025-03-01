interface PathData {
  id: string
  d: string
  fill?: string
  originalFill?: string
}

interface SvgData {
  id: string
  name: string
  viewBox: string
  width: string
  height: string
  paths: PathData[]
}

export function parseSvgString(svgString: string, svgId: string): SvgData {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgString, "image/svg+xml")
  const svgElement = doc.querySelector("svg")

  if (!svgElement) {
    throw new Error("Invalid SVG string")
  }

  const paths: PathData[] = []
  const pathElements = svgElement.querySelectorAll("path")

  pathElements.forEach((path, index) => {
    const pathData: PathData = {
      id: path.id || `path-${index}`,
      d: path.getAttribute("d") || "",
      fill: path.getAttribute("fill") || undefined,
      originalFill: path.getAttribute("fill") || undefined,
    }
    paths.push(pathData)
  })

  return {
    id: svgId,
    name: svgId,
    viewBox: svgElement.getAttribute("viewBox") || "0 0 100 100",
    width: svgElement.getAttribute("width") || "100%",
    height: svgElement.getAttribute("height") || "100%",
    paths,
  }
}

