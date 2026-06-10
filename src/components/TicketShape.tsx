interface TicketShapeProps {
  fill: string
  className?: string
}

/** Exact notched ticket silhouette from Figma (578.5 × 277.5). */
const TicketShape = ({ fill, className }: TicketShapeProps) => (
  <svg
    viewBox="0 0 578.5 277.5"
    preserveAspectRatio="none"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M0 0H578.5V85.114L566.108 96.2932V130.847V172.769L578.5 182.678V277.5H12.6213V143.55L0 129.577V0Z"
      fill={fill}
    />
  </svg>
)

export default TicketShape
