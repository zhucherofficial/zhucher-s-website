export function SectionHeading({ label, title, copy, align = 'left' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <span>{label}</span>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  )
}
