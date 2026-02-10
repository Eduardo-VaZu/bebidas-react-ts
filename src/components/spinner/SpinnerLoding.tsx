
export default function SpinnerLoding({ size = 24, color = '#6B7280', className = '' }: { size?: number; color?: string; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label="Cargando"
    >
      <circle cx="12" cy="12" r="10" stroke={color} strokeOpacity={0.25} strokeWidth={4} fill="none" />
      <path d="M12 2 A10 10 0 0 1 22 12" stroke={color} strokeWidth={4} strokeLinecap="round" fill="none">
        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
      </path>
    </svg>
  )
}

