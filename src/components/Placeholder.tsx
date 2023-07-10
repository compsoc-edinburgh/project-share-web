import { SKETCH_COLOR } from '../constants'

const Placeholder = ({ size }: { size: string }) => {
  return (
    <svg
      width={size}
      height={size}
      style={{ display: 'block', border: `1px solid ${SKETCH_COLOR}` }}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1L32 32M63 63L32 32M1 63L32 32M32 32L63 1"
        stroke={SKETCH_COLOR}
      />
    </svg>
  )
}

export default Placeholder
