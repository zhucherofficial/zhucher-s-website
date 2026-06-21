const iconProps = {
  width: 21,
  height: 21,
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': 'true',
}

export function SocialIcon({ id }) {
  if (id === 'bilibili') {
    return (
      <svg {...iconProps}>
        <path
          d="M7.4 4.8 5.7 3.1M16.6 4.8l1.7-1.7M5.6 7.2h12.8a2.8 2.8 0 0 1 2.8 2.8v6.2a3.4 3.4 0 0 1-3.4 3.4H6.2a3.4 3.4 0 0 1-3.4-3.4V10a2.8 2.8 0 0 1 2.8-2.8Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8.2 13h.1M15.7 13h.1" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    )
  }

  if (id === 'douyin') {
    return (
      <svg {...iconProps}>
        <path
          d="M15.2 3.5v10.1a5.2 5.2 0 1 1-3.9-5v3.2a2 2 0 1 0 1.2 1.8V3.5h2.7Z"
          stroke="#25f4ee"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.2 5.2c1 2.6 2.6 4.1 5.1 4.5"
          stroke="#fe2c55"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg {...iconProps}>
      <path
        d="M4.2 7.4a2.5 2.5 0 0 1 1.9-1.8C7.6 5.2 12 5.2 12 5.2s4.4 0 5.9.4a2.5 2.5 0 0 1 1.9 1.8c.4 1.5.4 4.6.4 4.6s0 3.1-.4 4.6a2.5 2.5 0 0 1-1.9 1.8c-1.5.4-5.9.4-5.9.4s-4.4 0-5.9-.4a2.5 2.5 0 0 1-1.9-1.8c-.4-1.5-.4-4.6-.4-4.6s0-3.1.4-4.6Z"
        stroke="#ff0000"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m10.4 9.3 4.2 2.7-4.2 2.7V9.3Z" fill="#ffffff" />
    </svg>
  )
}
