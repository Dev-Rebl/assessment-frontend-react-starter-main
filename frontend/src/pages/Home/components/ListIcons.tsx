interface IconProps {
  className?: string
}

export const GripIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 20 24" fill="currentColor" aria-hidden="true">
    <circle cx="5" cy="4" r="1.6" />
    <circle cx="15" cy="4" r="1.6" />
    <circle cx="5" cy="12" r="1.6" />
    <circle cx="15" cy="12" r="1.6" />
    <circle cx="5" cy="20" r="1.6" />
    <circle cx="15" cy="20" r="1.6" />
  </svg>
)

export const PlusIcon = ({ className }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
    <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
  </svg>
)

export const CheckIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2.5"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
  </svg>
)

export const TrashIcon = ({ className }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
    <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z" />
  </svg>
)

export const MusicNoteIcon = ({ className }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
    <path d="M212,32a12,12,0,0,0-10.4-2L90.4,57.8A12,12,0,0,0,81.3,69.5v94.7A44,44,0,1,0,24,206a44,44,0,0,0,81.3-23.2V109.4l87.4-21.8v52.6A44,44,0,1,0,216,179.3V44A12,12,0,0,0,212,32Z" />
  </svg>
)
