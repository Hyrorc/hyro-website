export default function Photo({
  src,
  alt = '',
  tone = 'navy',
  ratio,
  veil = false,
  className = '',
  children,
  eager = false,
  plain = false,
  noFilter = false,
}) {
  const unfiltered = plain || noFilter

  return (
    <div
      className={`photo photo--${tone}${veil ? ' photo--veil' : ''}${unfiltered ? ' photo--no-filter' : ''} ${className}`.trim()}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      {!unfiltered && <span className="photo-grain" aria-hidden="true" />}
      {children != null && <div className="photo-content">{children}</div>}
    </div>
  )
}
