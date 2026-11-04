/**
 * DOT PATTERN FOR THE CONNECT-THE-DOTS EXPERIENCE
 * 
 * 28 carefully positioned coordinates forming the calligraphic
 * hidden message: "I LOVE YOU ♡"
 */

export interface DotPoint {
  id: number;
  x: number;
  y: number;
  label: string; // letter or segment indicator
  hint?: string;
}

export const DOT_PATTERN: DotPoint[] = [
  // Letter "I"
  { id: 1, x: 90, y: 130, label: "1", hint: "Start of 'I'" },
  { id: 2, x: 130, y: 130, label: "2" },
  { id: 3, x: 110, y: 195, label: "3" },
  { id: 4, x: 95, y: 260, label: "4" },
  { id: 5, x: 135, y: 260, label: "5", hint: "Base of 'I'" },

  // Transition & Letter "L"
  { id: 6, x: 165, y: 240, label: "6" },
  { id: 7, x: 195, y: 120, label: "7", hint: "Top loop of 'L'" },
  { id: 8, x: 185, y: 260, label: "8" },
  { id: 9, x: 220, y: 260, label: "9", hint: "Base of 'L'" },

  // Letter "O"
  { id: 10, x: 250, y: 190, label: "10" },
  { id: 11, x: 232, y: 225, label: "11" },
  { id: 12, x: 252, y: 260, label: "12" },
  { id: 13, x: 272, y: 225, label: "13" },
  { id: 14, x: 260, y: 192, label: "14", hint: "Loop of 'O'" },

  // Letter "V"
  { id: 15, x: 300, y: 195, label: "15" },
  { id: 16, x: 325, y: 260, label: "16", hint: "Point of 'V'" },
  { id: 17, x: 350, y: 195, label: "17" },

  // Letter "E"
  { id: 18, x: 382, y: 190, label: "18" },
  { id: 19, x: 370, y: 225, label: "19" },
  { id: 20, x: 398, y: 260, label: "20", hint: "Finish 'LOVE'" },

  // Letter "Y"
  { id: 21, x: 445, y: 200, label: "21" },
  { id: 22, x: 468, y: 235, label: "22" },
  { id: 23, x: 490, y: 200, label: "23" },
  { id: 24, x: 472, y: 295, label: "24", hint: "Loop of 'Y'" },

  // Letter "O"
  { id: 25, x: 520, y: 205, label: "25" },
  { id: 26, x: 520, y: 260, label: "26" },

  // Letter "U" + Heart flourish
  { id: 27, x: 560, y: 205, label: "27" },
  { id: 28, x: 580, y: 260, label: "28" },
  { id: 29, x: 605, y: 205, label: "29" },
  { id: 30, x: 645, y: 175, label: "30", hint: "Heart crest" },
  { id: 31, x: 660, y: 195, label: "31" },
  { id: 32, x: 675, y: 175, label: "32" },
  { id: 33, x: 660, y: 230, label: "33", hint: "Heart tip ♡" },
];

/**
 * Creates a smooth SVG path string from an array of points
 */
export function createSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i < points.length - 2 ? points[i + 2] : p2;

    // Catmull-Rom to Cubic Bezier control points
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;

    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x} ${p2.y}`;
  }

  return path;
}
