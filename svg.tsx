"use client"

interface SvgProps {
  selectedPathId: string | null
  onPathSelect: (pathId: string) => void
  pathColors: Record<string, string>
}

export default function Svg({ selectedPathId, onPathSelect, pathColors }: SvgProps) {
  // Define path IDs for easier reference
  const PATH_IDS = {
    OUTER_CIRCLE: "outer-circle",
    TOP_LEFT: "top-left",
    TOP_RIGHT: "top-right",
    BOTTOM_LEFT: "bottom-left",
    BOTTOM_RIGHT: "bottom-right",
    MIDDLE_LEFT: "middle-left",
    MIDDLE_TOP: "middle-top",
    MIDDLE_RIGHT: "middle-right",
  }

  // Fix the TypeScript error by adding a type guard
  const getPathColor = (pathId: string) => {
    // Use optional chaining and nullish coalescing to safely access the property
    return pathColors?.[pathId] ?? "#FFFFFF"
  }

  const getPathStyle = (pathId: string) => {
    return {
      cursor: "pointer",
      stroke: selectedPathId === pathId ? "#000000" : "none",
      strokeWidth: selectedPathId === pathId ? 2 : 0,
    }
  }

  return (
    <svg width="200px" height="250px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path
        id={PATH_IDS.OUTER_CIRCLE}
        d="M827.1 782l-70.3 23.3c1.6 5.1 2.4 10.5 2.4 16.1 0 7.7-1.6 15-4.5 21.7l68.3 28.6c6.6-15.4 10.3-32.4 10.3-50.3 0-13.8-2.2-27-6.2-39.4z"
        fill={getPathColor(PATH_IDS.OUTER_CIRCLE)}
        style={getPathStyle(PATH_IDS.OUTER_CIRCLE)}
        onClick={() => onPathSelect(PATH_IDS.OUTER_CIRCLE)}
      />

      <path
        id={PATH_IDS.TOP_LEFT}
        d="M683.9 771.8l-28.6-68.3c-33.9 14.4-60.3 43.1-71.8 78.5l70.3 23.3c4.7-15.1 15.8-27.3 30.1-33.5z"
        fill={getPathColor(PATH_IDS.TOP_LEFT)}
        style={getPathStyle(PATH_IDS.TOP_LEFT)}
        onClick={() => onPathSelect(PATH_IDS.TOP_LEFT)}
      />

      <path
        id={PATH_IDS.TOP_RIGHT}
        d="M756.9 805.2l70.3-23.3c-12.5-38.7-42.9-69.4-81.5-82.2L722.4 770c16.4 5.5 29.3 18.7 34.5 35.2z"
        fill={getPathColor(PATH_IDS.TOP_RIGHT)}
        style={getPathStyle(PATH_IDS.TOP_RIGHT)}
        onClick={() => onPathSelect(PATH_IDS.TOP_RIGHT)}
      />

      <path
        id={PATH_IDS.BOTTOM_LEFT}
        d="M655.8 843l-68.3 28.6c13.1 30.6 37.7 55 68.4 67.9l28.6-68.3c-12.8-5.3-23.1-15.5-28.7-28.2z"
        fill={getPathColor(PATH_IDS.BOTTOM_LEFT)}
        style={getPathStyle(PATH_IDS.BOTTOM_LEFT)}
        onClick={() => onPathSelect(PATH_IDS.BOTTOM_LEFT)}
      />

      <path
        id={PATH_IDS.BOTTOM_RIGHT}
        d="M721.7 872.8L745 943c35.2-11.5 63.6-37.7 78.1-71.4L754.8 843c-6.2 14.1-18.2 25-33.1 29.8z"
        fill={getPathColor(PATH_IDS.BOTTOM_RIGHT)}
        style={getPathStyle(PATH_IDS.BOTTOM_RIGHT)}
        onClick={() => onPathSelect(PATH_IDS.BOTTOM_RIGHT)}
      />

      <path
        id={PATH_IDS.MIDDLE_LEFT}
        d="M705.3 767.3c6 0 11.7 1 17 2.8l23.3-70.3c-12.7-4.2-26.2-6.5-40.3-6.5-17.8 0-34.7 3.6-50.1 10.2l28.6 68.3c6.6-2.9 13.9-4.5 21.5-4.5z"
        fill={getPathColor(PATH_IDS.MIDDLE_LEFT)}
        style={getPathStyle(PATH_IDS.MIDDLE_LEFT)}
        onClick={() => onPathSelect(PATH_IDS.MIDDLE_LEFT)}
      />

      <path
        id={PATH_IDS.MIDDLE_TOP}
        d="M705.3 875.3c-7.3 0-14.3-1.5-20.7-4.1L656 939.5c15.2 6.3 31.8 9.9 49.3 9.9 13.9 0 27.2-2.2 39.7-6.3l-23.3-70.3c-5.1 1.6-10.7 2.5-16.4 2.5z"
        fill={getPathColor(PATH_IDS.MIDDLE_TOP)}
        style={getPathStyle(PATH_IDS.MIDDLE_TOP)}
        onClick={() => onPathSelect(PATH_IDS.MIDDLE_TOP)}
      />

      <path
        id={PATH_IDS.MIDDLE_RIGHT}
        d="M651.3 821.3c0-5.6 0.9-11 2.4-16.1L583.5 782c-4 12.4-6.2 25.6-6.2 39.4 0 17.8 3.7 34.8 10.3 50.3l68.3-28.6c-3-6.7-4.6-14.1-4.6-21.8z"
        fill={getPathColor(PATH_IDS.MIDDLE_RIGHT)}
        style={getPathStyle(PATH_IDS.MIDDLE_RIGHT)}
        onClick={() => onPathSelect(PATH_IDS.MIDDLE_RIGHT)}
      />
    </svg>
  )
}

