function SimulationTable({ label, headers, rows, highlight }) {
  return (
    <div className="campus-design-detail__results-table-wrap" role="region" aria-label={label} tabIndex={0}>
      <table>
        <thead><tr>{headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead>
        <tbody>{rows.map(([parameter, value], index) => (
          <tr key={`${parameter}-${index}`}>
            <th scope="row">{parameter}</th>
            <td>{parameter === highlight ? <strong>{value}</strong> : value}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  )
}

function WaterAeratorSimulationStudy() {
  return (
    <div className="campus-design-detail__study">
      <section className="campus-design-detail__study-subsection" aria-labelledby="aerator-study-setup">
        <h3 id="aerator-study-setup">CFD Simulation Setup</h3>
        <p>A three-dimensional Computational Fluid Dynamics (CFD) simulation was performed on the final circular-hole water aerator design using OpenFOAM v2606. The objective was to evaluate the velocity distribution, pressure field, and volumetric flow rate through the perforated aerator under a prescribed pressure difference.</p>
        <SimulationTable label="CFD simulation parameters" headers={['Parameter', 'Value']} rows={[
          ['CFD Software', 'OpenFOAM v2606'],
          ['Solver', 'simpleFoam'],
          ['Analysis Type', 'Steady-state, incompressible'],
          ['Fluid', 'Water'],
          ['Flow Model', 'Laminar'],
          ['Kinematic Viscosity', '1 × 10⁻⁶ m²/s'],
          ['Inlet Pressure', '10 kPa'],
          ['Outlet Pressure', '0 kPa'],
          ['Applied Pressure Difference', '10 kPa'],
          ['Wall Boundary Condition', 'No-slip'],
          ['Mesh Type', 'Tetrahedral'],
          ['Volume Elements', '103,305'],
        ]} />
        <h4>Final Design Specifications</h4>
        <ul>
          <li>Outer diameter: 25 mm</li>
          <li>Overall length: 30 mm</li>
          <li>Wall thickness: 1.5 mm</li>
          <li>Perforated screen thickness: 1 mm</li>
          <li>Number of circular perforations: 121</li>
          <li>Perforation diameter: 1.152 mm</li>
          <li>Perforation arrangement: Five concentric rings and one central hole</li>
        </ul>
      </section>

      <section className="campus-design-detail__study-subsection" aria-labelledby="aerator-study-velocity">
        <h3 id="aerator-study-velocity">Velocity Distribution</h3>
        <p>The CFD results show the acceleration of water as it passes through the circular perforations of the aerator screen. Localized regions of higher velocity occur within and immediately downstream of the perforations.</p>
        <SimulationTable label="Velocity distribution results" headers={['Velocity Parameter', 'Result']} rows={[
          ['Maximum Velocity Magnitude', '7.98 m/s'],
          ['Peak Centerline Velocity', '4.31 m/s'],
          ['Average Boundary Velocity', '1.252 m/s'],
        ]} />
      </section>

      <section className="campus-design-detail__study-subsection" aria-labelledby="aerator-study-pressure">
        <h3 id="aerator-study-pressure">Pressure Distribution</h3>
        <p>The pressure field was evaluated across the computational fluid domain under a prescribed inlet-to-outlet pressure difference of 10 kPa.</p>
        <p>The simulated centerline pressure profile reached a minimum value of −4.37 kPa relative to the simulation pressure reference.</p>
        <SimulationTable label="Pressure distribution results" headers={['Pressure Parameter', 'Result']} rows={[
          ['Inlet Pressure', '10 kPa'],
          ['Outlet Pressure', '0 kPa'],
          ['Applied Pressure Difference', '10 kPa'],
          ['Minimum Centerline Pressure', '−4.37 kPa'],
        ]} />
      </section>

      <section className="campus-design-detail__study-subsection" aria-labelledby="aerator-study-flow">
        <h3 id="aerator-study-flow">Volumetric Flow Rate</h3>
        <p>The latest reported volumetric flow rate through the final circular-hole aerator was <strong>28.42494 L/min</strong>, under an applied pressure difference of 10 kPa.</p>
        <SimulationTable label="Volumetric flow-rate results" headers={['Flow Parameter', 'Result']} rows={[
          ['Volumetric Flow Rate', '28.42494 L/min'],
          ['Volumetric Flow Rate', '4.73749 × 10⁻⁴ m³/s'],
          ['Approximate Mass Flow Rate', '0.474 kg/s'],
          ['Applied Pressure Difference', '10 kPa'],
        ]} />
        <p>The approximate mass flow rate assumes a water density of 1,000 kg/m³.</p>
      </section>

      <section className="campus-design-detail__study-subsection" aria-labelledby="aerator-study-summary">
        <h3 id="aerator-study-summary">Summary of CFD Results</h3>
        <SimulationTable label="Summary of CFD results" headers={['Performance Metric', 'Simulation Result']} highlight="Volumetric Flow Rate" rows={[
          ['Maximum Flow Velocity', '7.98 m/s'],
          ['Peak Centerline Velocity', '4.31 m/s'],
          ['Average Boundary Velocity', '1.252 m/s'],
          ['Minimum Centerline Pressure', '−4.37 kPa'],
          ['Applied Pressure Difference', '10 kPa'],
          ['Volumetric Flow Rate', '28.42 L/min'],
        ]} />
      </section>

      <section className="campus-design-detail__study-subsection" aria-labelledby="aerator-study-significance">
        <h3 id="aerator-study-significance">CFD Validation and Practical Significance</h3>
        <p>The CFD simulations were conducted to evaluate the hydraulic performance of the proposed 3D-printable water aerator and assess its feasibility as an alternative to conventional metallic aerators.</p>
        <p>The simulated velocity and pressure distributions demonstrate the expected flow behavior through a perforated aerator screen. Under the prescribed pressure difference of 10 kPa, the final design produced a reported volumetric flow rate of 28.42 L/min. These findings provide preliminary numerical support for the hydraulic functionality of the proposed design.</p>
        <p>A key advantage of the proposed aerator is its compatibility with additive manufacturing. Conventional metallic aerators often rely on specialized manufacturing and assembly processes, whereas the proposed geometry can potentially be produced using accessible 3D-printing technologies.</p>
        <ul>
          <li><strong>Cost-effectiveness:</strong> Reduced tooling requirements and the possibility of low-cost, on-demand manufacturing.</li>
          <li><strong>Material efficiency:</strong> Additive manufacturing enables controlled material deposition and may reduce material waste.</li>
          <li><strong>Design flexibility:</strong> Perforation diameter, spacing, geometry, and overall dimensions can be modified without requiring new manufacturing tooling.</li>
          <li><strong>Accessibility:</strong> Localized production can reduce dependence on specialized manufacturing facilities and suppliers.</li>
          <li><strong>Sustainability:</strong> Suitable recyclable or lower-impact printing materials, combined with localized manufacturing, offer opportunities to reduce the environmental impact of production.</li>
        </ul>
        <p>The CFD results support the preliminary technical feasibility of the proposed 3D-printable water aerator. The design combines a functional perforated flow geometry with the manufacturing flexibility of additive manufacturing, presenting a potentially cost-effective, customizable, and sustainable alternative to conventional metallic aerators.</p>
      </section>
    </div>
  )
}

export default WaterAeratorSimulationStudy
