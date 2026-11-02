import { useId, useLayoutEffect, useRef, useState } from 'react'

const materials = [
  { name: 'PA12', dash: undefined },
  { name: 'PLA', dash: '8 4' },
  { name: 'PETG', dash: '2 4' },
]

function CampusLoadChart({ title, yLabel, unit, maximum, tickStep, data }) {
  const id = useId()
  const container = useRef(null)
  const [width, setWidth] = useState(640)
  const [activePoint, setActivePoint] = useState(null)

  useLayoutEffect(() => {
    const element = container.current
    const measure = () => setWidth(Math.max(280, element.getBoundingClientRect().width))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const height = 330
  const plot = { left: 58, right: width - 18, top: 18, bottom: height - 58 }
  // Lines connect only the five supplied increments; no extrapolated segments.
  const x = (load) => plot.left + (load - data[0].load) / (data.at(-1).load - data[0].load) * (plot.right - plot.left)
  const y = (value) => plot.bottom - value / maximum * (plot.bottom - plot.top)
  const ticks = Array.from({ length: Math.round(maximum / tickStep) + 1 }, (_, index) => index * tickStep)

  return (
    <figure className="campus-design-detail__load-chart" ref={container}>
      <ul className="campus-design-detail__chart-legend" aria-label="Materials">
        {materials.map(({ name, dash }) => <li key={name}>
          <svg width="28" height="12" aria-hidden="true"><path d="M0 6H28" className={`campus-design-detail__series--${name.toLowerCase()}`} strokeDasharray={dash} /></svg>
          {name}
        </li>)}
      </ul>
      <div className="campus-design-detail__chart-plot">
        <svg viewBox={`0 0 ${width} ${height}`} role="group" aria-labelledby={`${id}-title ${id}-description`}>
          <title id={`${id}-title`}>{title}</title>
          <desc id={`${id}-description`}>PA12, PLA, and PETG at five recorded loads from 1.2 to 6.0 kg equivalent. Focus or hover over a point for its exact value.</desc>
          {ticks.map((tick) => <g key={tick}>
            <path className="campus-design-detail__chart-grid" d={`M${plot.left} ${y(tick)}H${plot.right}`} />
            <text className="campus-design-detail__chart-tick" x={plot.left - 9} y={y(tick) + 4} textAnchor="end">{tick}</text>
          </g>)}
          <path className="campus-design-detail__chart-axis" d={`M${plot.left} ${plot.top}V${plot.bottom}H${plot.right}`} />
          {data.map(({ load }) => <text className="campus-design-detail__chart-tick" key={load} x={x(load)} y={plot.bottom + 20} textAnchor="middle">{load.toFixed(1)}</text>)}
          <text className="campus-design-detail__chart-axis-label" x={(plot.left + plot.right) / 2} y={height - 8} textAnchor="middle">Total Applied Hook Load (kg equivalent)</text>
          <text className="campus-design-detail__chart-axis-label" transform={`translate(14 ${(plot.top + plot.bottom) / 2}) rotate(-90)`} textAnchor="middle">{yLabel}</text>
          {materials.map(({ name, dash }) => <polyline key={name} className={`campus-design-detail__chart-line campus-design-detail__series--${name.toLowerCase()}`} strokeDasharray={dash} points={data.map((point) => `${x(point.load)},${y(point[name])}`).join(' ')} />)}
          {materials.map(({ name }) => data.map((point) => {
            const label = `${name}: ${point.load.toFixed(1)} kg equivalent, ${point[name].toFixed(5)} ${unit}`
            return <circle
              key={`${name}-${point.load}`}
              className={`campus-design-detail__chart-point campus-design-detail__series--${name.toLowerCase()}`}
              cx={x(point.load)} cy={y(point[name])} r="4" tabIndex={0}
              role="img" aria-label={label}
              onMouseEnter={() => setActivePoint(label)} onMouseLeave={() => setActivePoint(null)}
              onFocus={() => setActivePoint(label)} onBlur={() => setActivePoint(null)}
            ><title>{label}</title></circle>
          }))}
        </svg>
        {activePoint && <output className="campus-design-detail__chart-tooltip" aria-live="polite">{activePoint}</output>}
      </div>
    </figure>
  )
}

export default CampusLoadChart
