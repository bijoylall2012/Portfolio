import CampusLoadChart from './CampusLoadChart.jsx'
function SimulationTable({ label, headers, rows }) {
  return (
    <div className="campus-design-detail__results-table-wrap" role="region" aria-label={label} tabIndex={0}>
      <table>
        <thead><tr>{headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead>
        <tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0
          ? <th key={index} scope="row">{cell}</th>
          : <td key={index}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

function HangerSimulationStudy() {
  return (
    <div className="campus-design-detail__study">
      <section className="campus-design-detail__study-subsection" aria-labelledby="hanger-study-1">
        <h3 id="hanger-study-1">Objective</h3>
        <p>The hanger bracket was evaluated using finite element analysis (FEA) to optimize its structural performance and identify the most suitable material for the final design. Three candidate materials, PA12, PLA, and PETG, were investigated under identical geometry, loading, and boundary conditions.</p>
        <p>The study focused on stress distribution, maximum deformation, structural stiffness, and load response. A comparative evaluation of these parameters was used to identify the best-performing material configuration.</p>
      </section>
      <section className="campus-design-detail__study-subsection" aria-labelledby="hanger-study-2">
        <h3 id="hanger-study-2">Simulation Methodology</h3>
        <p>The hanger assembly was modeled in FreeCAD, comprising an inverted U-shaped bracket mounted over a wooden partition, with three projecting hooks on each side.</p>
        <p>The bracket and partition were discretized using a three-dimensional tetrahedral finite element mesh.</p>
        <p>FreeCAD was used for finite element model preparation and post-processing, while CalculiX was used to perform the structural simulations. ParaView was used for advanced visualization of the stress distribution and progressive deformation.</p>
        <p>The wooden partition was constrained at its support, while the bracket-to-partition connections were represented using three tie constraints.</p>
        <p>Gravity was included to account for the self-weight of the modeled assembly.</p>
        <p>Three downward loads were applied to the hooks:</p>
        <ul>
          <li>Hook 1: 3 kg equivalent (29.43 N)</li>
          <li>Hook 2: 2 kg equivalent (19.62 N)</li>
          <li>Hook 3: 1 kg equivalent (9.81 N)</li>
        </ul>
        <p>The combined applied hook load was approximately 58.86 N, equivalent to 6 kg under standard gravitational acceleration.</p>
        <p>The simulations were performed using a single nonlinear-geometry static analysis step divided into five loading increments.</p>
        <p>The same geometry, loading conditions, boundary conditions, and mesh topology were maintained across the three material studies, enabling a controlled comparison of material performance.</p>
      </section>
      <section className="campus-design-detail__study-subsection" aria-labelledby="hanger-study-3">
        <h3 id="hanger-study-3">Finite Element Model</h3>
        <SimulationTable label="Finite Element Model" headers={["Parameter", "Value"]} rows={[["Analysis type", "Static structural"], ["Geometric nonlinearity", "Enabled"], ["CAD and pre-processing", "FreeCAD"], ["Solver", "CalculiX"], ["Post-processing", "FreeCAD and ParaView"], ["Mesh type", "3D quadratic tetrahedral"], ["Number of nodes", "22,090"], ["Reported volume elements", "11,452"], ["Total applied hook load", "58.86 N"], ["Hook load distribution", "29.43 N, 19.62 N, 9.81 N"], ["Gravity", "9.80665 m/s\u00b2"], ["Connection definition", "Three tie constraints"], ["Loading increments", "5"], ["Materials evaluated", "PA12, PLA, PETG"]]} />
      </section>
      <section className="campus-design-detail__study-subsection" aria-labelledby="hanger-study-4">
        <h3 id="hanger-study-4">Material Properties</h3>
        <p>The three material configurations were evaluated using isotropic elastic material properties.</p>
        <SimulationTable label="Material Properties" headers={["Property", "PA12", "PLA", "PETG"]} rows={[["Young's modulus (MPa)", "1,700", "3,500", "2,100"]]} />
        <p>The wooden partition was represented using a Young's modulus of 10,000 MPa and Poisson's ratio of 0.30.</p>
      </section>
      <section className="campus-design-detail__study-subsection" aria-labelledby="hanger-study-5">
        <h3 id="hanger-study-5">Final Simulation Results</h3>
        <p>The final increment represented the complete applied hook load of 6 kg.</p>
        <p>The maximum von Mises stress and resultant displacement were extracted for each material.</p>
        <SimulationTable label="Final Simulation Results" headers={["Material", "Maximum von Mises Stress (MPa)", "Maximum Displacement (mm)"]} rows={[["PA12", "7.982", "2.126"], ["PLA", "7.951", "1.053"], ["PETG", "7.977", "1.733"]]} />
        <p>The simulations demonstrated a substantial difference in deformation between the materials, while the maximum von Mises stress remained nearly identical across all three configurations.</p>
        <p>PLA produced the lowest maximum deformation of 1.053 mm, followed by PETG at 1.733 mm and PA12 at 2.126 mm.</p>
        <p>The maximum stress varied by less than 0.4% across the three material studies.</p>
      </section>
      <section className="campus-design-detail__study-subsection" aria-labelledby="hanger-study-6">
        <h3 id="hanger-study-6">Displacement Analysis</h3>
        <p>The maximum displacement results demonstrated a clear relationship between material stiffness and structural deformation.</p>
        <p>PA12, with a Young's modulus of 1,700 MPa, exhibited the greatest deformation.</p>
        <p>PETG, with a Young's modulus of 2,100 MPa, showed improved stiffness and reduced deformation.</p>
        <p>PLA, with the highest Young's modulus of 3,500 MPa, demonstrated the greatest resistance to deformation.</p>
        <p>Relative to the PA12 baseline:</p>
        <ul>
          <li>PLA reduced maximum displacement by approximately 50.5%.</li>
          <li>PETG reduced maximum displacement by approximately 18.5%.</li>
        </ul>
        <p>PLA also reduced maximum displacement by approximately 39.2% compared with PETG.</p>
        <p>The differences extended beyond the single maximum-displacement node.</p>
        <SimulationTable label="Displacement Analysis" headers={["Material", "95th Percentile Displacement (mm)", "99th Percentile Displacement (mm)"]} rows={[["PA12", "0.666", "1.730"], ["PLA", "0.333", "0.858"], ["PETG", "0.545", "1.411"]]} />
        <p>The percentile results confirmed that PLA exhibited consistently lower deformation throughout the modeled assembly.</p>
        <p>This established PLA as the best-performing material in terms of structural stiffness.</p>
      </section>
      <section className="campus-design-detail__study-subsection" aria-labelledby="hanger-study-7">
        <h3 id="hanger-study-7">Von Mises Stress Analysis</h3>
        <p>The maximum von Mises stress values were:</p>
        <ul>
          <li>PA12: 7.982 MPa</li>
          <li>PLA: 7.951 MPa</li>
          <li>PETG: 7.977 MPa</li>
        </ul>
        <p>The maximum difference across the three materials was approximately 0.031 MPa, corresponding to less than 0.4%.</p>
        <p>Despite substantial differences in elastic stiffness, the stress distributions remained remarkably similar.</p>
        <p>This demonstrated that the geometry, loading, and boundary conditions were the primary factors governing the stress response.</p>
        <p>PLA recorded the lowest maximum von Mises stress while simultaneously providing the lowest deformation.</p>
      </section>
      <section className="campus-design-detail__study-subsection" aria-labelledby="hanger-study-10">
        <h3 id="hanger-study-10">Maximum Displacement vs Applied Load</h3>
        <CampusLoadChart
          title="Maximum Displacement vs Applied Load"
          yLabel="Maximum Displacement (mm)"
          unit="mm"
          maximum={2.5}
          tickStep={0.5}
          data={[{"load": 1.2, "PA12": 0.42333, "PLA": 0.21008, "PETG": 0.34529}, {"load": 2.4, "PA12": 0.84763, "PLA": 0.42041, "PETG": 0.69123}, {"load": 3.6, "PA12": 1.27283, "PLA": 0.63098, "PETG": 1.03779}, {"load": 4.8, "PA12": 1.69886, "PLA": 0.84178, "PETG": 1.38492}, {"load": 6.0, "PA12": 2.12566, "PLA": 1.05279, "PETG": 1.7326}]}
        />
      </section>
      <section className="campus-design-detail__study-subsection" aria-labelledby="hanger-study-13">
        <h3 id="hanger-study-13">Material Performance Comparison</h3>
        <p>The comparative study produced a clear ranking of the materials against the evaluated structural performance criteria.</p>
        <SimulationTable label="Material Performance Comparison" headers={["Evaluation Criterion", "PA12", "PLA", "PETG"]} rows={[["Maximum von Mises stress", "7.982 MPa", "7.951 MPa", "7.977 MPa"], ["Maximum displacement", "2.126 mm", "1.053 mm", "1.733 mm"], ["Displacement reduction vs PA12", "Baseline", "50.5%", "18.5%"], ["Structural stiffness ranking", "3rd", "1st", "2nd"], ["Maximum stress ranking", "3rd", "1st", "2nd"], ["Overall study ranking", "3rd", "1st", "2nd"]]} />
        <h4>PA12</h4>
        <p>PA12 served as the baseline material and exhibited the greatest elastic deformation under the prescribed loading.</p>
        <h4>PETG</h4>
        <p>PETG demonstrated intermediate stiffness and reduced deformation compared with PA12.</p>
        <h4>PLA</h4>
        <p>PLA demonstrated the highest structural stiffness, the lowest maximum deformation, and the lowest recorded maximum von Mises stress.</p>
        <p>Based on the combined evaluation of stress, deformation, and stiffness, PLA emerged as the best-performing material configuration in the study.</p>
      </section>
      <section className="campus-design-detail__study-subsection" aria-labelledby="hanger-study-14">
        <h3 id="hanger-study-14">Final Engineering Conclusion</h3>
        <ul>
          <li>The finite element study successfully evaluated and compared three material configurations of the hanger bracket under a combined static hook load of 6 kg.</li>
          <li>The simulations demonstrated that the bracket's stress distribution remained consistent across PA12, PLA, and PETG, with maximum von Mises stresses varying by less than 0.4%.</li>
          <li>Material stiffness had a substantial influence on deformation.</li>
          <li>PLA achieved the best structural performance in the comparative study, with a maximum displacement of 1.053 mm, compared with 1.733 mm for PETG and 2.126 mm for PA12.</li>
          <li>This corresponded to a 50.5% reduction in maximum deformation relative to the baseline material.</li>
          <li>The five-increment loading analysis demonstrated a consistent progressive structural response, while the solver results confirmed successful convergence across all three material configurations.</li>
        </ul>
        <p><strong>Based on the combined evaluation of stress, deformation, and structural stiffness, PLA was selected as the final optimized material configuration for the hanger bracket.</strong></p>
        <p>The study established a quantitative engineering basis for material selection and demonstrated how digital simulation can guide design decisions and improve structural performance before manufacturing.</p>
      </section>
    </div>
  )
}

export default HangerSimulationStudy
