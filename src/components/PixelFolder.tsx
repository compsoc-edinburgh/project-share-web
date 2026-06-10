interface PixelFolderProps {
  /** Rendered width in px; height follows the 128:85.33 design ratio. */
  width?: number
  className?: string
}

/**
 * The pixel folder mark (from Figma). Body uses currentColor; the pixel
 * cutouts use --ps-paper (defaults to the page background) so the mark works
 * on any surface — e.g. white-on-purple inside the ticket.
 */
const PixelFolder = ({ width = 44, className }: PixelFolderProps) => (
  <svg
    viewBox="0 0 128 85.34"
    width={width}
    height={(width * 85.34) / 128}
    className={className}
    aria-hidden="true"
    focusable="false"
  >
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
  </svg>
)

export default PixelFolder
