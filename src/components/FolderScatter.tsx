// Decorative pixel-folder cluster from the About frame in Figma.
// 32 base positions × 3 offset clusters = the exact scatter in the design.
const BASE: [number, number][] = [
  [59, 123], [171, 115], [59, 241], [171, 233], [61, 166], [173, 158],
  [11, 242], [123, 234], [59, 189], [171, 181], [145, 193], [257, 185],
  [97, 197], [209, 189], [111, 277], [223, 269], [85, 106], [197, 98],
  [85, 224], [197, 216], [87, 149], [199, 141], [37, 225], [149, 217],
  [85, 172], [197, 164], [171, 176], [283, 168], [123, 180], [235, 172],
  [137, 260], [249, 252],
]

const CLUSTER_OFFSETS: [number, number][] = [
  [0, 0],
  [-11, 152],
  [96, -98],
]

const FolderScatter = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 423 458"
    className={className}
    aria-hidden="true"
    focusable="false"
    style={{ width: '100%', height: 'auto', color: 'var(--color-accent)' }}
  >
    <defs>
      <symbol id="ps-folder-glyph" viewBox="0 0 128 85.34">
        <path
          d="M25.6 8.533H119.467V68.267H110.933V76.8H25.6V59.733H17.067V42.667H8.533V34.133H25.6V8.533Z"
          fill="currentColor"
        />
        <g fill="var(--ps-paper, var(--color-bg))">
          <path d="M128 17.067H119.466V68.267H110.933V76.8H25.6V85.333H128V17.067Z" />
          <rect width="8.533" height="17.067" transform="matrix(-1 0 0 1 110.934 51.2)" />
          <rect width="8.533" height="17.067" transform="matrix(-1 0 0 1 102.401 34.133)" />
          <rect width="8.533" height="17.067" transform="matrix(-1 0 0 1 25.6 59.733)" />
          <rect width="8.533" height="17.067" transform="matrix(-1 0 0 1 17.067 42.667)" />
          <path d="M25.6 8.533H17.067V25.6H0V42.667H8.533V34.133H93.867V25.6H25.6V8.533Z" />
          <rect width="59.733" height="8.533" transform="matrix(-1 0 0 1 119.467 8.533)" />
          <rect width="34.133" height="8.533" transform="matrix(-1 0 0 1 59.734 0)" />
        </g>
      </symbol>
    </defs>
    {CLUSTER_OFFSETS.flatMap(([ox, oy], ci) =>
      BASE.map(([x, y], i) => (
        <use
          key={`${ci}-${i}`}
          href="#ps-folder-glyph"
          x={x + ox}
          y={y + oy}
          width={44}
          height={29.33}
          className="scatter-folder"
        />
      ))
    )}
  </svg>
)

export default FolderScatter
