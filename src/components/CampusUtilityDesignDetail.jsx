import HangerSimulationStudy from './HangerSimulationStudy.jsx'
import WaterAeratorSimulationStudy from './WaterAeratorSimulationStudy.jsx'
import { sitePath } from '../utils/sitePaths.js'

function AeratorFlowAnnotations({ pressure = false }) {
  const markerId = pressure ? 'aerator-pressure-flow-arrow' : 'aerator-velocity-flow-arrow'
  const positions = pressure
    ? { inlet: [1200, 160], outlet: [1200, 1000], flow: [1390, 510], arrows: [[1160, 180, 280], [1195, 370, 780], [1160, 860, 980]], fontSize: 30, strokeWidth: 4 }
    : { inlet: [240, 39], outlet: [225, 495], flow: [292, 218], arrows: [[239, 55, 100], [240, 180, 350], [240, 420, 470]], fontSize: 15, strokeWidth: 2 }

  return (
    <svg
      className={`campus-design-detail__flow-annotations${pressure ? ' campus-design-detail__flow-annotations--pressure' : ''}`}
      viewBox={pressure ? '688.8 0 1080 1080' : '0 0 418 517'}
      role="img"
      aria-label="INLET at the top, FLOW DIRECTION downward through the screen, OUTLET at the bottom"
      focusable="false"
    >
      <defs>
        <marker id={markerId} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0L6 3L0 6Z" fill="currentColor" />
        </marker>
      </defs>
      <g fontSize={positions.fontSize}>
        <text x={positions.inlet[0]} y={positions.inlet[1]}>INLET</text>
        <text x={positions.outlet[0]} y={positions.outlet[1]}>OUTLET</text>
        <text x={positions.flow[0]} y={positions.flow[1]} textAnchor="middle">
          <tspan x={positions.flow[0]}>FLOW</tspan>
          <tspan x={positions.flow[0]} dy="1.25em">DIRECTION</tspan>
        </text>
      </g>
      {positions.arrows.map(([x, top, bottom]) => (
        <path key={top} d={`M${x} ${top}V${bottom}`} fill="none" stroke="currentColor" strokeWidth={positions.strokeWidth} markerEnd={`url(#${markerId})`} />
      ))}
    </svg>
  )
}

const hangerDimensions = [
  ['Partition thickness', '25 mm'],
  ['Hanger width', '120 mm'],
  ['Vertical legs', '100 mm'],
  ['Horizontal hook arms', '50 mm'],
  ['Upward-facing lips', '30 mm'],
  ['Plate thickness', '4 mm'],
  ['Hooks on modelled side', '3'],
  ['Manufacturing intent', '3D printing'],
]

const aeratorDimensions = [
  ['Outer diameter', '25 mm'],
  ['Inner housing diameter', '22 mm'],
  ['Overall length', '30 mm'],
  ['Housing wall thickness', '1.5 mm'],
  ['Internal screen thickness', '1 mm'],
  ['Circular hole diameter', '1.152 mm'],
  ['Hole arrangement', '5 concentric rings + center'],
  ['Manufacturing method', '3D printing'],
]

const hangerDesigns = [
  {
    number: '01',
    title: 'Design 1: Basic Single Hook',
    dimensions: [['Width', '40 mm'], ['Plate thickness', '3 mm'], ['Hook arm', '40 mm'], ['Hanging points', '1'], ['Retaining lip', 'None']],
    material: 'PLA',
    modification: 'A compact bracket with a single straight hook and minimal material requirements.',
    rationale: 'Prioritises simplicity, reduced material consumption, and straightforward manufacturing.',
    assessment: 'Provides only one hanging point and lacks a retaining feature to prevent items from slipping off.',
  },
  {
    number: '02',
    title: 'Design 2: Multi-Hook Bracket',
    dimensions: [['Width', '120 mm'], ['Plate thickness', '3 mm'], ['Hook arm', '50 mm'], ['Hanging points', '3'], ['Retaining lip', 'None']],
    material: 'PETG',
    modification: 'Increased the bracket width to 120 mm, introduced three hanging points, and selected PETG to explore a tougher material alternative.',
    rationale: 'Improves hanging capacity while evaluating material toughness and the benefits of a wider bracket.',
    assessment: 'The 3 mm section offers lower geometric bending rigidity than the final 4 mm section, and the absence of retaining lips reduces item security.',
  },
  {
    number: '03',
    title: 'Design 3: Final Multi-Hook Hanger',
    dimensions: [['Width', '120 mm'], ['Plate thickness', '4 mm'], ['Hook arm', '50 mm'], ['Hanging points', '3'], ['Retaining lip', '30 mm']],
    material: 'PLA',
    modification: 'Increased plate thickness from 3 mm to 4 mm and introduced 30 mm upward-facing retaining lips.',
    rationale: 'The thicker section improves bending rigidity, while the retaining lips help secure towels and clothing.',
    assessment: 'Combines three hanging points, improved structural rigidity, and item retention within a compact bracket suitable for 3D printing.',
    selected: true,
  },
]

const aeratorDesigns = [
  {
    number: '01',
    title: 'Design 1: Aligned Circular-Hole Screen',
    dimensions: [['Outer diameter', '25 mm'], ['Screen thickness', '1 mm'], ['Hole geometry', 'Circular'], ['Hole diameter', '1.2 mm'], ['Hole arrangement', 'Aligned square grid']],
    material: 'PLA',
    modification: 'Circular openings arranged in an aligned square grid with a 3.0 mm centre-to-centre pitch.',
    rationale: 'Provides a simple opening geometry with relatively wide supporting bridges between holes.',
    assessment: 'The 12.6% theoretical open area limits the available flow passage compared with the final design.',
  },
  {
    number: '02',
    title: 'Design 2: Hexagonal-Hole Screen',
    dimensions: [['Outer diameter', '25 mm'], ['Screen thickness', '1 mm'], ['Hole geometry', 'Hexagonal'], ['Hole diameter', 'Not applicable'], ['Hole arrangement', 'Hexagonal pattern']],
    material: 'PLA',
    modification: 'Replaced circular openings with a hexagonal opening pattern to explore alternative screen geometry.',
    rationale: 'Investigates different opening shapes and their potential for improving screen coverage and water passage.',
    assessment: 'More complex opening boundaries increase geometric complexity and can complicate manufacturing.',
  },
  {
    number: '03',
    title: 'Design 3: Final Staggered Circular-Hole Screen',
    dimensions: [['Outer diameter', '25 mm'], ['Screen thickness', '1 mm'], ['Hole geometry', 'Circular'], ['Hole diameter', '1.2 mm'], ['Hole arrangement', 'Concentric circular grid']],
    material: 'PLA',
    modification: 'Introduced 1.2 mm circular openings arranged in a staggered triangular pattern with a 2.4 mm centre-to-centre pitch.',
    rationale: 'Improves opening distribution while maintaining consistent material bridges between neighbouring holes.',
    assessment: 'Achieves approximately 22.7% theoretical open area, around 80% greater than the aligned circular-hole design, while retaining a simple, repeatable geometry.',
    selected: true,
  },
]

const costItems = [
  {
    name: 'Cloth hanger',
    mass: '55 g',
    material: '₹82.50',
    time: '2.5 hours',
    printing: '₹250',
    total: '₹333',
    replacement: '₹500',
    saving: '₹167',
    reduction: '33.4%',
    ratio: '66.6%',
  },
  {
    name: 'Water aerator',
    mass: '2 g',
    material: '₹3.00',
    time: '0.5 hours',
    printing: '₹50',
    total: '₹53',
    replacement: '₹100',
    saving: '₹47',
    reduction: '47.0%',
    ratio: '53%',
  },
]

function SectionHeading({ number, id, children }) {
  return (
    <header className="campus-design-detail__section-heading">
      <span aria-hidden="true">{number}</span>
      <h2 id={id}>{children}</h2>
    </header>
  )
}

function HangerSchematic({ variant }) {
  const hooks = variant === 'single' ? [160] : [104, 160, 216]
  const hasLips = variant === 'final'

  return (
    <svg viewBox="0 0 320 180" aria-hidden="true" focusable="false">
      <path className="campus-design-detail__schematic-muted" d="M64 35h192v22H64zM82 57v27m156-27v27" />
      <path className="campus-design-detail__schematic" d="M70 84h180v18H70z" />
      {hooks.map((x) => (
        <path key={x} className="campus-design-detail__schematic" d={`M${x} 102v40q0 12 12 12h17${hasLips ? 'v-12' : ''}`} />
      ))}
      {hasLips && <path className="campus-design-detail__schematic" d="M99 142v12m68-12v12m68-12v12" />}
      <path className="campus-design-detail__schematic-dimension" d="M70 121h180m-180-5v10m180-10v10" />
    </svg>
  )
}

function AeratorSchematic({ variant }) {
  const centers = []
  for (let row = 0; row < 5; row += 1) {
    for (let column = 0; column < 6; column += 1) {
      centers.push({ x: 132 + column * 11 + (row % 2 ? 5.5 : 0), y: 67 + row * 11 })
    }
  }

  return (
    <svg viewBox="0 0 320 180" aria-hidden="true" focusable="false">
      <circle className="campus-design-detail__schematic" cx="160" cy="90" r="66" />
      {centers.map(({ x, y }, index) => variant === 'hexagonal'
        ? <path key={index} className="campus-design-detail__schematic-hole" d={`M${x - 3.1} ${y}l1.55-2.7h3.1L${x + 3.1} ${y}l-1.55 2.7h-3.1z`} />
        : <circle key={index} className="campus-design-detail__schematic-hole" cx={x} cy={y} r="2.25" />)}
    </svg>
  )
}

function VisualPlaceholder({ product, variant, label, large = false }) {
  const description = `${label}. Illustrative schematic placeholder; project visual to be supplied.`
  return (
    <div
      className={`campus-design-detail__visual${large ? ' campus-design-detail__visual--large' : ''}`}
      role="img"
      aria-label={description}
    >
      {product === 'hanger' ? <HangerSchematic variant={variant} /> : <AeratorSchematic variant={variant} />}
      <span className="campus-design-detail__visual-label">{label}</span>
      <span className="campus-design-detail__visual-note">ILLUSTRATIVE PLACEHOLDER</span>
    </div>
  )
}

function SpecificationPanel({ title, dimensions, rowCount }) {
  return (
    <article className="campus-design-detail__specification" style={{ '--specification-rows': rowCount, '--panel-rows': rowCount + 1 }}>
      <h3>{title}</h3>
      <dl>
        {dimensions.map(([label, value]) => (
          <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
        ))}
      </dl>
    </article>
  )
}

function DesignCard({ design }) {
  const specificationCount = design.dimensions.length
  return (
    <article
      className={`campus-design-detail__design-card${design.selected ? ' campus-design-detail__design-card--selected' : ''}`}
      style={{ '--specification-rows': specificationCount, '--dimension-rows': specificationCount + 1, '--card-rows': specificationCount + 6 }}
    >
      <h4>{design.title}</h4>
      <div className="campus-design-detail__design-status">
        {design.selected && <span className="campus-design-detail__selected-badge">SELECTED FINAL DESIGN</span>}
      </div>
      <div className="campus-design-detail__design-dimensions">
        <h5>Key specifications</h5>
        <dl>{design.dimensions.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </div>
      <dl className="campus-design-detail__design-field"><dt>Design modification</dt><dd>{design.modification}</dd></dl>
      <dl className="campus-design-detail__design-field"><dt>Engineering rationale</dt><dd>{design.rationale}</dd></dl>
      <dl className="campus-design-detail__design-field"><dt>{design.selected ? 'Main advantage' : 'Main limitation'}</dt><dd>{design.assessment}</dd></dl>
    </article>
  )
}

function DesignGroup({ title, designs }) {
  return (
    <div className="campus-design-detail__design-group">
      <h3>{title}</h3>
      <div className="campus-design-detail__design-grid">
        {designs.map((design) => <DesignCard key={design.number} design={design} />)}
      </div>
    </div>
  )
}

function CostCard({ item }) {
  return (
    <article className="campus-design-detail__cost-card">
      <h3>{item.name}</h3>
      <div className="campus-design-detail__cost-bars" aria-label={`${item.name}: total estimated manufacturing cost ${item.total}, estimated conventional replacement cost ${item.replacement}`}>
        <div><span>Estimated conventional replacement cost</span><strong>{item.replacement}</strong><i><b style={{ width: '100%' }} /></i></div>
        <div><span>Total estimated manufacturing cost</span><strong>{item.total}</strong><i><b style={{ width: item.ratio }} /></i></div>
      </div>
      <dl>
        <div><dt>Estimated printed mass</dt><dd>{item.mass}</dd></div>
        <div><dt>Estimated PLA material cost</dt><dd>{item.material}</dd></div>
        <div><dt>Estimated printing time</dt><dd>{item.time}</dd></div>
        <div><dt>Estimated machine operating cost</dt><dd>{item.printing}</dd></div>
      </dl>
      <p className="campus-design-detail__saving">Estimated saving per unit: <strong>{item.saving}</strong> <span>({item.reduction} estimated cost reduction)</span></p>
    </article>
  )
}

function CampusUtilityDesignDetail() {
  return (
    <div className="campus-design-detail" aria-label="Sustainable Campus Utility Solutions project details">
      <div className="campus-design-detail__lead-media">
        <video
          className="campus-design-detail__video-frame"
          src={sitePath('Utility_Project/Simulation2.mp4')}
          width="1920"
          height="1080"
          autoPlay
          muted
          loop
          playsInline
          controls
          aria-label="Hanger structural simulation animation"
        />
      </div>
      <section className="campus-design-detail__section" aria-labelledby="campus-design-overview">
        <SectionHeading number="01" id="campus-design-overview">Project Overview</SectionHeading>
        <p>Damaged bathroom fixtures were a recurring problem across campus, particularly broken clothes hangers and water aerators affected by corrosion, blockage, or mechanical damage. This project aimed to develop practical, sustainable replacements that could be manufactured locally using 3D printing.</p>
        <p>The project followed a structured engineering design process, progressing from problem identification and concept development to CAD modeling, digital simulation, and design optimization. FreeCAD and CalculiX were used to evaluate the hanger bracket's structural performance, while ParaView supported the visualization of stress distributions and progressive deformation. Three candidate materials, PA12, PLA, and PETG, were evaluated under identical loading conditions, with PLA emerging as the best-performing configuration. The simulation results, together with manufacturing feasibility, cost, material requirements, and environmental considerations, informed the final design selection.</p>
      </section>

      <section className="campus-design-detail__section" aria-labelledby="campus-design-background">
        <SectionHeading number="02" id="campus-design-background">Background and Motivation</SectionHeading>
        <p>During my time on campus, I noticed that most bathroom cloth hangers were broken, while many water aerators were rusted, blocked, or damaged. The problem became personal when my towel got wet because I had to hang it on a wall without a functioning hook.</p>
        <p>That frustration motivated me to develop practical, sustainable alternatives to these neglected campus utilities, designs that could be manufactured locally, replaced easily, and adapted to different requirements.</p>
      </section>

      <section className="campus-design-detail__section" aria-labelledby="campus-design-geometry">
        <SectionHeading number="03" id="campus-design-geometry">Design Requirements and Final Geometry</SectionHeading>
        <div className="campus-design-detail__specification-grid">
          <SpecificationPanel title="Cloth hanger" dimensions={hangerDimensions} rowCount={Math.max(hangerDimensions.length, aeratorDimensions.length)} />
          <SpecificationPanel title="Water aerator" dimensions={aeratorDimensions} rowCount={Math.max(hangerDimensions.length, aeratorDimensions.length)} />
        </div>
        <div className="campus-design-detail__final-visuals">
          <figure>
            <div className="campus-design-detail__visual campus-design-detail__visual--large">
              <img className="campus-design-detail__cad-image" src={sitePath('Utility_Project/Image1.png')} alt="Dimensioned CAD model of the hanger bracket mounted over a partition." width="800" height="609" loading="lazy" />
            </div>
            <figcaption>Final Cloth Hanger CAD<br />(Brown block: part of door on which hanger is mounted)</figcaption>
          </figure>
          <figure>
            <div className="campus-design-detail__visual campus-design-detail__visual--large">
              <img className="campus-design-detail__cad-image" src={sitePath('Utility_Project/Image5.png')} alt="Dimensioned CAD model of the circular-hole water aerator." width="576" height="493" loading="lazy" />
            </div>
            <figcaption>Final Water Aerator CAD</figcaption>
          </figure>
        </div>
      </section>

      <section className="campus-design-detail__section" aria-labelledby="campus-design-methodology">
        <SectionHeading number="04" id="campus-design-methodology">Design Methodology</SectionHeading>
        <p>The design process began with physical inspection and measurement of the existing bathroom fixtures. For the hanger, the partition thickness and available mounting space were measured to establish the geometric constraints. For the aerator, the required diameter and housing dimensions were identified to ensure compatibility with the intended installation.</p>
        <p>The measurements were translated into three-dimensional CAD models using FreeCAD, an open-source computer-aided design software used to create and modify engineering geometries. Multiple design alternatives were developed by varying dimensions, structural features, and opening patterns.</p>
        <p>To optimize the designs and select the best-performing configurations, digital simulations were conducted using FreeCAD and CalculiX, with ParaView used for advanced visualization and post-processing. Engineering parameters including von Mises stress, deformation, structural stiffness, and load response were evaluated to guide design optimization. Material requirements, manufacturing feasibility, cost, and environmental considerations were also assessed before selecting the final configurations.</p>
      </section>

      <section className="campus-design-detail__section" aria-labelledby="campus-design-alternatives">
        <SectionHeading number="05" id="campus-design-alternatives">Design Alternatives</SectionHeading>
        <p>Three design alternatives were developed for each utility to evaluate how changes in geometry, material selection, and functional features affected performance and manufacturability. The hanger designs progressively explored hanging capacity, structural rigidity, and item retention, while the aerator designs compared different opening geometries and arrangements to balance water passage with screen support. The final configurations were selected based on their overall engineering and practical advantages.</p>
        <DesignGroup title="Cloth Hanger" designs={hangerDesigns} />
        <DesignGroup title="Water Aerator" designs={aeratorDesigns} />
      </section>

      <section className="campus-design-detail__section" aria-labelledby="campus-design-materials">
        <SectionHeading number="06" id="campus-design-materials">Material Selection and Manufacturing</SectionHeading>
        <div className="campus-design-detail__materials">
          <article>
            <h3>PLA</h3>
            <p>Relatively inexpensive and easy to 3D print, PLA provides good stiffness for dimensionally stable components and is available in bio-based formulations. Its limited heat resistance and potentially brittle behaviour under some loading conditions require consideration.</p>
          </article>
          <article>
            <h3>PETG</h3>
            <p>PETG offers greater toughness and generally better moisture resistance than PLA, making it a practical alternative for humid bathroom environments. It has a slightly higher material cost and requires different printing conditions.</p>
          </article>
          <article>
            <h3>PA12 (Polyamide 12 / Nylon 12)</h3>
            <p>PA12 is a nylon-based engineering thermoplastic used in additive manufacturing. It offers good toughness, flexibility, dimensional stability, and relatively low moisture absorption compared with several other nylon grades. It is suitable for functional components requiring durability and resistance to repeated mechanical loading. PA12 can be manufactured using additive manufacturing processes such as selective laser sintering (SLS), as well as compatible filament-based processes.</p>
          </article>
          <article>
            <h3>Conventional metals</h3>
            <p>Metals offer higher stiffness and potentially greater long-term durability, but may require machining, forming, or casting. Their greater density and potentially more complex manufacturing must be considered, as must corrosion of certain metals or coatings in humid environments.</p>
          </article>
        </div>
        <p>PLA was selected as the baseline for the design and cost comparisons because of its printability, stiffness, and relatively low cost. PETG remains a practical alternative where toughness and moisture resistance are priorities. Suitability for potable-water contact depends on the specific formulation and manufacturing conditions.</p>
      </section>

      <section className="campus-design-detail__section" aria-labelledby="campus-design-hanger-results">
        <SectionHeading number="07" id="campus-design-hanger-results">Simulation Results: Cloth Hanger</SectionHeading>
        <figure className="campus-design-detail__simulation-image">
          <img src={sitePath('Utility_Project/Image2.png')} alt="Finite element stress contours for the hanger bracket and partition." width="1600" height="1000" loading="lazy" />
        </figure>
        <HangerSimulationStudy />
      </section>

      <section className="campus-design-detail__section" aria-labelledby="campus-design-aerator-results">
        <SectionHeading number="08" id="campus-design-aerator-results">Simulation Results: Water Aerator</SectionHeading>
        <div className="campus-design-detail__aerator-figures">
          <figure>
            <div className="campus-design-detail__velocity-figure">
              <img src={sitePath('Utility_Project/Image3.png')} alt="Water aerator velocity magnitude contour with a color scale in metres per second." width="418" height="517" loading="lazy" />
              <AeratorFlowAnnotations />
            </div>
            <figcaption>Velocity: Cross Sectional View</figcaption>
          </figure>
          <figure>
            <div className="campus-design-detail__pressure-figure">
              <img src={sitePath('Utility_Project/Image4.png')} alt="Water aerator pressure contour with a color scale in kilopascals." width="1920" height="1080" loading="lazy" />
              <AeratorFlowAnnotations pressure />
            </div>
            <figcaption>Pressure: Cross Sectional View</figcaption>
          </figure>
        </div>
        <WaterAeratorSimulationStudy />
      </section>

      <section className="campus-design-detail__section" aria-labelledby="campus-design-cost">
        <SectionHeading number="09" id="campus-design-cost">Cost Analysis</SectionHeading>
        <p>The economic feasibility of both designs was evaluated by estimating material consumption, 3D-printing time, and machine operating costs. These manufacturing estimates were compared with the estimated cost of conventional replacement components to assess the potential savings from local production. The comparison focuses on small-batch manufacturing, where 3D printing offers the advantage of producing replacement parts without dedicated tooling or large inventories.</p>
        <div className="campus-design-detail__cost-inputs">
          <span>PLA filament price: ₹1,500/kg</span>
          <span>Estimated printer operating cost: ₹100/hour</span>
          <span>Estimated conventional hanger replacement: ₹500/unit</span>
          <span>Estimated conventional aerator replacement: ₹100/unit</span>
        </div>
        <div className="campus-design-detail__cost-grid">
          {costItems.map((item) => <CostCard key={item.name} item={item} />)}
        </div>
        <div className="campus-design-detail__cost-interpretation">
          <p>The cloth hanger has an estimated manufacturing cost of ₹333, comprising approximately ₹83 in material and ₹250 in printing costs. Compared with an estimated conventional replacement cost of ₹500, this represents a saving of ₹167 per unit, or 33.4%.</p>
          <p>The water aerator requires substantially less material, with an estimated printed mass of just 2 g. Its estimated manufacturing cost is ₹53, compared with ₹100 for a conventional replacement, resulting in a saving of ₹47 per unit, or 47%.</p>
          <p>Beyond direct cost savings, local 3D printing reduces the need for specialised tooling and allows replacement components to be produced when required. This approach is particularly useful for campus maintenance, where relatively small quantities of replacement parts may be needed across different installations.</p>
        </div>
      </section>

      <section className="campus-design-detail__section" aria-labelledby="campus-design-sustainability">
        <SectionHeading number="10" id="campus-design-sustainability">Sustainability and Practical Benefits</SectionHeading>
        <div className="campus-design-detail__sustainability">
          <article>
            <h3>Materials and durability</h3>
            <p>PLA can be manufactured from renewable biological feedstocks; PETG is an alternative when toughness and moisture resistance matter more. Material choice should account for durability and replacement frequency as well as feedstock origin. Bio-based PLA does not automatically biodegrade under ordinary environmental conditions.</p>
          </article>
          <article>
            <h3>Manufacturing and resource use</h3>
            <p>Additive manufacturing produces parts directly from digital designs without dedicated moulds or dies for small quantities. Material deposition follows the geometry and support strategy, potentially reducing offcuts compared with some subtractive processes. Printing still consumes energy and has environmental impacts.</p>
          </article>
          <article>
            <h3>Lifecycle and maintenance</h3>
            <p>Raw-material production, manufacturing energy, transport, service life, replacement, and end-of-life handling all affect sustainability. Local production can reduce certain transport and inventory needs, while longer-lasting parts can reduce replacement frequency. Individual components can be replaced without discarding whole fixture assemblies, and CAD models can be reused or adapted to other installations.</p>
          </article>
          <article>
            <h3>Economic sustainability</h3>
            <p>Based on the estimated manufacturing costs, unit costs are 33.4% lower for the hanger and 47% lower for the aerator. Local small-batch production can reduce dependence on conventional replacement-part supply chains and support repeatable maintenance.</p>
          </article>
        </div>
      </section>

      <section className="campus-design-detail__section" aria-labelledby="campus-design-conclusion">
        <SectionHeading number="11" id="campus-design-conclusion">Conclusion</SectionHeading>
        <p>What began as frustration with broken bathroom fixtures developed into an engineering project focused on practical, sustainable replacement solutions. By measuring installation constraints, developing alternative designs in FreeCAD, and comparing their structural, functional, manufacturing, and economic characteristics, we selected a multi-hook hanger and a staggered circular-hole aerator as the final configurations.</p>
        <p>Digital simulation was integral to the design optimization process. FreeCAD and CalculiX were used for finite element model preparation, structural simulation, and results processing, while ParaView enabled detailed visualization of stress distributions and progressive deformation. The comparative study of PA12, PLA, and PETG identified PLA as the best-performing hanger material, achieving a 50.5% reduction in maximum deformation relative to the PA12 baseline under identical loading conditions. This demonstrated the effectiveness of simulation-driven engineering in evaluating design alternatives and selecting an optimized configuration.</p>
        <p>The hanger provides three hanging points with improved section rigidity and item retention. With estimated manufacturing cost reductions of 33.4% and 47%, respectively, the project demonstrates how engineering design and local manufacturing can address everyday campus maintenance problems.</p>
      </section>
    </div>
  )
}

export default CampusUtilityDesignDetail
