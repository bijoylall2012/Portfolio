function SectionHeading({ number, id, children }) {
  return (
    <header className="combustion-detail__section-heading">
      <span aria-hidden="true">{number}</span>
      <h2 id={id}>{children}</h2>
    </header>
  )
}

function Equation({ label, children }) {
  return (
    <div className="combustion-detail__equation" role="math" aria-label={label}>
      <math display="block">{children}</math>
    </div>
  )
}

function TwoZoneSchematic() {
  return (
    <figure className="combustion-detail__figure">
      <div className="combustion-detail__zones" role="img" aria-label="Conceptual two-zone cylinder model: burned products and unburned mixture occupy separate volumes at a common cylinder pressure.">
        <div className="combustion-detail__shared-pressure">Common cylinder pressure <strong>P</strong></div>
        <div className="combustion-detail__zone-pair">
          <div className="combustion-detail__zone combustion-detail__zone--burned">
            <span className="combustion-detail__zone-index">ZONE 1</span>
            <strong>Burned products</strong>
            <span><i>m</i><sub>b</sub>, <i>V</i><sub>b</sub>, <i>T</i><sub>b</sub></span>
          </div>
          <div className="combustion-detail__zone combustion-detail__zone--unburned">
            <span className="combustion-detail__zone-index">ZONE 2</span>
            <strong>Unburned mixture</strong>
            <span><i>m</i><sub>u</sub>, <i>V</i><sub>u</sub>, <i>T</i><sub>u</sub></span>
          </div>
        </div>
      </div>
      <figcaption>Two-zone representation of the cylinder contents</figcaption>
    </figure>
  )
}

const modelingSteps = [
  ['Geometry', 'Calculate piston area, swept and clearance volumes, and instantaneous cylinder volume from engine dimensions and crank angle.'],
  ['Combustion', 'Apply the mass-fraction-burned relationship to determine the burned and unburned masses throughout the combustion interval.'],
  ['Gas properties', 'Evaluate temperature-dependent specific heats, enthalpy, and entropy for reactants and combustion products using NASA polynomial coefficients.'],
  ['Heat transfer', 'Estimate heat-transfer coefficients using gas-flow relationships involving Reynolds and Nusselt numbers, then evaluate heat transfer over crank angle.'],
  ['Pressure calculation', 'Evaluate in-cylinder pressure using the thermodynamic relationships governing changes in temperature, volume, and the state of the working gases.'],
  ['Visualization', 'Generate pressure–volume and pressure–crank-angle plots to examine the engine-cycle behavior.'],
]

function ModelingWorkflow() {
  return (
    <figure className="combustion-detail__figure">
      <ol className="combustion-detail__workflow">
        {modelingSteps.map(([title, description], index) => (
          <li key={title}>
            <span className="combustion-detail__workflow-index">{String(index + 1).padStart(2, '0')}</span>
            <strong>{title}</strong>
            <p>{description}</p>
          </li>
        ))}
      </ol>
      <figcaption>Modeling workflow from engine geometry to cycle plots</figcaption>
    </figure>
  )
}

function ProjectPhoto({ src, alt, caption, className = '' }) {
  return (
    <figure className={`combustion-detail__photo ${className}`}>
      <img src={src} alt={alt} />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

function LowTemperatureCombustionDetail() {
  return (
    <div className="combustion-detail" aria-label="Low-temperature combustion project details">
      <section className="combustion-detail__section" aria-labelledby="combustion-background">
        <SectionHeading number="01" id="combustion-background">Background</SectionHeading>

        <div className="combustion-detail__subsection">
          <h3>Low-temperature combustion</h3>
          <p>Internal combustion engines must balance thermal efficiency with pollutant emissions. In conventional combustion, localized high-temperature regions promote the formation of nitrogen oxides (NOx), while fuel-rich regions can contribute to soot formation.</p>
          <p>Low-temperature combustion (LTC) reduces peak in-cylinder temperatures by promoting auto-ignition across a diluted fuel–air mixture rather than relying on a conventional propagating flame front. Exhaust gas recirculation (EGR) dilutes the fresh charge, moderates oxygen concentration, and helps control the rate of heat release.</p>
          <p>The lower peak temperatures suppress the temperature-sensitive chemical reactions responsible for thermal NOx formation. More distributed combustion can also reduce localized fuel-rich regions and soot formation. With appropriate control of combustion timing and heat release, LTC offers the potential for high thermal efficiency alongside lower emissions.</p>
        </div>

        <div className="combustion-detail__subsection">
          <h3>Why exergy matters</h3>
          <p>Energy conservation alone does not describe how effectively fuel energy can be converted into useful work. Exergy measures this potential relative to the surrounding environment.</p>
          <p>Exergy destruction is associated with irreversible processes such as combustion, heat transfer, friction, and mixing. Understanding these losses provides a thermodynamic basis for investigating improvements in engine efficiency.</p>
        </div>
        <ProjectPhoto
          src="/Photo20.png"
          alt="Stacked energy distribution comparison for conventional diesel, low-temperature combustion, gas PPCI, and D-F PCCI at 9–11 bar IMEP."
          caption="Efficiency comparison"
        />
      </section>

      <section className="combustion-detail__section" aria-labelledby="combustion-thermodynamic-model">
        <SectionHeading number="02" id="combustion-thermodynamic-model">Thermodynamic Model</SectionHeading>

        <div className="combustion-detail__subsection">
          <h3>Two-zone combustion</h3>
          <p>During combustion, burned products and the unburned fuel–air mixture have different temperatures and thermodynamic properties. A two-zone model represents them separately while maintaining a common cylinder pressure.</p>
          <p>The total cylinder mass and volume are divided between the two zones:</p>
          <div className="combustion-detail__equation-pair">
            <Equation label="m equals m sub b plus m sub u">
              <mrow><mi>m</mi><mo>=</mo><msub><mi>m</mi><mi>b</mi></msub><mo>+</mo><msub><mi>m</mi><mi>u</mi></msub></mrow>
            </Equation>
            <Equation label="V equals V sub b plus V sub u">
              <mrow><mi>V</mi><mo>=</mo><msub><mi>V</mi><mi>b</mi></msub><mo>+</mo><msub><mi>V</mi><mi>u</mi></msub></mrow>
            </Equation>
          </div>
          <p>where <i>m</i><sub>b</sub>, <i>m</i><sub>u</sub> and <i>V</i><sub>b</sub>, <i>V</i><sub>u</sub> denote the burned and unburned masses and volumes.</p>
          <p>The mass fraction burned is</p>
          <Equation label="x sub b equals m sub b divided by m">
            <mrow><msub><mi>x</mi><mi>b</mi></msub><mo>=</mo><mfrac><msub><mi>m</mi><mi>b</mi></msub><mi>m</mi></mfrac></mrow>
          </Equation>
          <p>A Wiebe function describes its evolution with crank angle:</p>
          <Equation label="x sub b of theta equals one minus exponential of negative a times the quantity theta minus theta zero over delta theta raised to n plus one">
            <mrow>
              <msub><mi>x</mi><mi>b</mi></msub><mo>(</mo><mi>θ</mi><mo>)</mo><mo>=</mo><mn>1</mn><mo>−</mo><mi mathvariant="normal">exp</mi><mo>[</mo>
              <mo>−</mo><mi>a</mi><msup><mrow><mo>(</mo><mfrac><mrow><mi>θ</mi><mo>−</mo><msub><mi>θ</mi><mn>0</mn></msub></mrow><mi>Δθ</mi></mfrac><mo>)</mo></mrow><mrow><mi>n</mi><mo>+</mo><mn>1</mn></mrow></msup><mo>]</mo>
            </mrow>
          </Equation>
          <p>Here, <i>θ</i><sub>0</sub> is the start of combustion, <i>Δθ</i> is the combustion duration, and <i>a</i> and <i>n</i> control the shape of the burn profile.</p>
          <TwoZoneSchematic />
        </div>

        <div className="combustion-detail__subsection">
          <h3>Thermodynamic properties</h3>
          <p>Assuming ideal-gas behavior in each zone:</p>
          <div className="combustion-detail__equation-pair">
            <Equation label="P V sub b equals m sub b R sub b T sub b">
              <mrow><mi>P</mi><msub><mi>V</mi><mi>b</mi></msub><mo>=</mo><msub><mi>m</mi><mi>b</mi></msub><msub><mi>R</mi><mi>b</mi></msub><msub><mi>T</mi><mi>b</mi></msub></mrow>
            </Equation>
            <Equation label="P V sub u equals m sub u R sub u T sub u">
              <mrow><mi>P</mi><msub><mi>V</mi><mi>u</mi></msub><mo>=</mo><msub><mi>m</mi><mi>u</mi></msub><msub><mi>R</mi><mi>u</mi></msub><msub><mi>T</mi><mi>u</mi></msub></mrow>
            </Equation>
          </div>
          <p>Temperature-dependent specific heats are evaluated using NASA polynomial relations:</p>
          <Equation label="C p over R equals a one plus a two T plus a three T squared plus a four T cubed plus a five T to the fourth">
            <mrow>
              <mfrac><msub><mi>C</mi><mi>p</mi></msub><mi>R</mi></mfrac><mo>=</mo>
              <msub><mi>a</mi><mn>1</mn></msub><mo>+</mo><msub><mi>a</mi><mn>2</mn></msub><mi>T</mi><mo>+</mo>
              <msub><mi>a</mi><mn>3</mn></msub><msup><mi>T</mi><mn>2</mn></msup><mo>+</mo>
              <msub><mi>a</mi><mn>4</mn></msub><msup><mi>T</mi><mn>3</mn></msup><mo>+</mo>
              <msub><mi>a</mi><mn>5</mn></msub><msup><mi>T</mi><mn>4</mn></msup>
            </mrow>
          </Equation>
          <p>The corresponding dimensionless enthalpy and entropy relations are</p>
          <Equation label="h over R T equals a one plus a two T over two plus a three T squared over three plus a four T cubed over four plus a five T to the fourth over five plus a six over T">
            <mrow>
              <mfrac><mi>h</mi><mrow><mi>R</mi><mi>T</mi></mrow></mfrac><mo>=</mo><msub><mi>a</mi><mn>1</mn></msub><mo>+</mo>
              <mfrac><mrow><msub><mi>a</mi><mn>2</mn></msub><mi>T</mi></mrow><mn>2</mn></mfrac><mo>+</mo>
              <mfrac><mrow><msub><mi>a</mi><mn>3</mn></msub><msup><mi>T</mi><mn>2</mn></msup></mrow><mn>3</mn></mfrac><mo>+</mo>
              <mfrac><mrow><msub><mi>a</mi><mn>4</mn></msub><msup><mi>T</mi><mn>3</mn></msup></mrow><mn>4</mn></mfrac><mo>+</mo>
              <mfrac><mrow><msub><mi>a</mi><mn>5</mn></msub><msup><mi>T</mi><mn>4</mn></msup></mrow><mn>5</mn></mfrac><mo>+</mo>
              <mfrac><msub><mi>a</mi><mn>6</mn></msub><mi>T</mi></mfrac>
            </mrow>
          </Equation>
          <Equation label="s over R equals a one natural logarithm T plus a two T plus a three T squared over two plus a four T cubed over three plus a five T to the fourth over four plus a seven">
            <mrow>
              <mfrac><mi>s</mi><mi>R</mi></mfrac><mo>=</mo><msub><mi>a</mi><mn>1</mn></msub><mi mathvariant="normal">ln</mi><mi>T</mi><mo>+</mo><msub><mi>a</mi><mn>2</mn></msub><mi>T</mi><mo>+</mo>
              <mfrac><mrow><msub><mi>a</mi><mn>3</mn></msub><msup><mi>T</mi><mn>2</mn></msup></mrow><mn>2</mn></mfrac><mo>+</mo>
              <mfrac><mrow><msub><mi>a</mi><mn>4</mn></msub><msup><mi>T</mi><mn>3</mn></msup></mrow><mn>3</mn></mfrac><mo>+</mo>
              <mfrac><mrow><msub><mi>a</mi><mn>5</mn></msub><msup><mi>T</mi><mn>4</mn></msup></mrow><mn>4</mn></mfrac><mo>+</mo><msub><mi>a</mi><mn>7</mn></msub>
            </mrow>
          </Equation>
          <p>The coefficients <i>a</i><sub>1</sub>,…,<i>a</i><sub>7</sub> depend on the chemical species and applicable temperature range. The properties of reactants and combustion products are evaluated separately to account for changes in composition during combustion.</p>
        </div>

        <div className="combustion-detail__subsection">
          <h3>Cylinder geometry and pressure</h3>
          <p>The instantaneous cylinder volume is determined from crank angle using slider-crank geometry:</p>
          <Equation label="V of theta equals V c plus A p times the quantity r times one minus cosine theta plus l minus square root of l squared minus r squared sine squared theta">
            <mrow>
              <mi>V</mi><mo>(</mo><mi>θ</mi><mo>)</mo><mo>=</mo><msub><mi>V</mi><mi>c</mi></msub><mo>+</mo><msub><mi>A</mi><mi>p</mi></msub><mo>[</mo>
              <mi>r</mi><mo>(</mo><mn>1</mn><mo>−</mo><mi mathvariant="normal">cos</mi><mi>θ</mi><mo>)</mo><mo>+</mo><mi>l</mi><mo>−</mo>
              <msqrt><mrow><msup><mi>l</mi><mn>2</mn></msup><mo>−</mo><msup><mi>r</mi><mn>2</mn></msup><msup><mi mathvariant="normal">sin</mi><mn>2</mn></msup><mi>θ</mi></mrow></msqrt><mo>]</mo>
            </mrow>
          </Equation>
          <p>where <i>V</i><sub>c</sub> is clearance volume, <i>A</i><sub>p</sub> is piston area, <i>r</i> is crank radius, and <i>l</i> is connecting-rod length. The angle convention must be consistent with the model.</p>
          <p>The pressure evolution is evaluated using the thermodynamic state, volume change, and heat-transfer calculations over successive crank-angle positions.</p>
        </div>
        <ProjectPhoto
          src="/Photo21.png"
          alt="Cylinder schematic showing intake and exhaust valves, burned and unburned zones, heat transfer, and work."
          caption="2-Zone combustion model schematic"
        />
      </section>

      <section className="combustion-detail__section" aria-labelledby="combustion-matlab-model">
        <SectionHeading number="03" id="combustion-matlab-model">MATLAB Engine Model</SectionHeading>
        <p className="combustion-detail__lead">The engine model combines cylinder geometry, combustion progression, thermodynamic properties, and heat transfer to evaluate in-cylinder behavior.</p>

        <div className="combustion-detail__subsection">
          <h3>Engine specifications</h3>
          <div className="humanoid-detail__table-wrap combustion-detail__table-wrap">
            <table>
              <thead><tr><th scope="col">Parameter</th><th scope="col">Value</th></tr></thead>
              <tbody>
                <tr><th scope="row">Configuration</th><td>Four-stroke, spark-ignition</td></tr>
                <tr><th scope="row">Bore</th><td>36 mm</td></tr>
                <tr><th scope="row">Stroke</th><td>41.8 mm</td></tr>
                <tr><th scope="row">Cylinders</th><td>1</td></tr>
                <tr><th scope="row">Compression ratio</th><td>8:1</td></tr>
                <tr><th scope="row">Excess-air coefficient</th><td>1.01</td></tr>
                <tr><th scope="row">Combustion-start angle</th><td>154°</td></tr>
                <tr><th scope="row">Intake valve closing</th><td>0°</td></tr>
                <tr><th scope="row">Exhaust valve opening</th><td>314°</td></tr>
                <tr><th scope="row">Combustion duration</th><td>54°</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="combustion-detail__subsection">
          <h3>Modeling workflow</h3>
          <ModelingWorkflow />
          <p>Heat-transfer relationships use the Reynolds and Nusselt numbers:</p>
          <div className="combustion-detail__equation-pair">
            <Equation label="Reynolds number equals density u L over dynamic viscosity">
              <mrow><mi>Re</mi><mo>=</mo><mfrac><mrow><mi>ρ</mi><mi>u</mi><mi>L</mi></mrow><mi>μ</mi></mfrac></mrow>
            </Equation>
            <Equation label="Nusselt number equals h L over k">
              <mrow><mi>Nu</mi><mo>=</mo><mfrac><mrow><mi>h</mi><mi>L</mi></mrow><mi>k</mi></mfrac></mrow>
            </Equation>
          </div>
          <p>Here, <i>ρ</i> is density, <i>u</i> is characteristic velocity, <i>L</i> is characteristic length, <i>μ</i> is dynamic viscosity, <i>h</i> is the heat-transfer coefficient, and <i>k</i> is thermal conductivity.</p>
        </div>

        <ProjectPhoto
          className="combustion-detail__photo--workflow"
          src="/Photo22.png"
          alt="Flowchart of engine, geometry, fuel, and atmospheric inputs leading to model outputs."
          caption="MATLAB model workflow"
        />
      </section>

      <section className="combustion-detail__section" aria-labelledby="combustion-results">
        <SectionHeading number="04" id="combustion-results">Simulation Results</SectionHeading>

        <div className="combustion-detail__subsection">
          <h3>Pressure–volume diagram</h3>
          <p>The pressure–volume (P–V) diagram shows how cylinder pressure changes with instantaneous volume. Pressure rises during compression, increases further with combustion, and decreases during expansion as the gases perform work on the piston.</p>
          <p>The shape of the curve connects the engine's thermodynamic state to its work-producing process. For a complete cycle, the net indicated work is represented by the enclosed area:</p>
          <Equation label="W cycle equals the closed integral of P d V">
            <mrow><msub><mi>W</mi><mtext>cycle</mtext></msub><mo>=</mo><mo>∮</mo><mi>P</mi><mi>d</mi><mi>V</mi></mrow>
          </Equation>
          <p>The simulated P–V behavior follows the expected trends of the engine cycle.</p>
        </div>

        <div className="combustion-detail__subsection">
          <h3>Pressure–crank-angle diagram</h3>
          <p>The pressure–crank-angle (P–θ) diagram shows how cylinder pressure evolves with crankshaft position. It reveals the pressure rise during compression, the effect of combustion, and the subsequent pressure decrease during expansion.</p>
          <p>Unlike the P–V diagram, this plot emphasizes the timing of pressure changes relative to crank angle, making it useful for interpreting the relationship between combustion progression and engine-cycle behavior.</p>
          <p>The simulated pressure–crank-angle behavior follows the expected trends of the modeled engine.</p>
        </div>
        <div className="combustion-detail__results-figures">
          <ProjectPhoto
            className="combustion-detail__photo--paired"
            src="/Photo23.png"
            alt="Pressure–volume variation graph for the modeled engine cycle."
            caption="Pressure-Volume Graph"
          />
          <ProjectPhoto
            className="combustion-detail__photo--paired"
            src="/Photo24.png"
            alt="Pressure–crank-angle variation graph for the modeled engine cycle."
            caption="Pressure-Crank Angle Graph"
          />
        </div>
      </section>

      <section className="combustion-detail__section" aria-labelledby="combustion-takeaways">
        <SectionHeading number="05" id="combustion-takeaways">Engineering Takeaways</SectionHeading>
        <ul className="combustion-detail__takeaways">
          <li><strong>Two-zone modeling:</strong> Separating burned and unburned gases captures the differences in their temperatures, compositions, and thermodynamic properties during combustion.</li>
          <li><strong>Temperature-dependent properties:</strong> Accounting for variations in specific heat, enthalpy, and entropy provides a more representative description of the working gases.</li>
          <li><strong>Engine-cycle interpretation:</strong> P–V and P–θ plots connect thermodynamic calculations to cylinder volume, crankshaft position, combustion, and work production.</li>
          <li><strong>Exergy perspective:</strong> Energy analysis describes energy conservation, while exergy analysis considers the potential to perform useful work and the losses caused by irreversible processes.</li>
        </ul>

        <div className="combustion-detail__subsection">
          <h3>Further scope</h3>
          <p>The model provides a foundation for quantitative exergy calculations, investigating the effects of EGR and combustion timing, and examining the trade-off between engine efficiency and pollutant formation. More accurate thermodynamic property calculations and comparison with experimental data can further strengthen the analysis.</p>
        </div>
      </section>
    </div>
  )
}

export default LowTemperatureCombustionDetail
