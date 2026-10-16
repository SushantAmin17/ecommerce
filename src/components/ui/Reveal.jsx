import useInView from '../../hooks/useInView'

/**
 * Wraps children in a scroll-reveal animation. `as` sets the element,
 * `delay` staggers (seconds), `variant` picks the motion.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  variant = 'up', // up | fade | left | right | scale
  className = '',
  ...rest
}) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${inView ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
