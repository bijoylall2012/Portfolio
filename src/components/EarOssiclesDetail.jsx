import { sitePath } from '../utils/sitePaths.js'

const ossicleFigures = [
  {
    src: sitePath('images/figure1.png'),
    alt: 'Modal analysis figure for the stapes.',
    caption: 'Modal Analysis of Stapes',
  },
  {
    src: sitePath('images/figure2.png'),
    alt: 'Modal analysis figure for the malleus.',
    caption: 'Modal Analysis of Malleus',
  },
  {
    src: sitePath('images/figure3.png'),
    alt: 'Modal analysis figure for the incus.',
    caption: 'Modal Analysis of Incus',
  },
]

function SectionHeading({ number, children, id }) {
  return (
    <header className="ear-ossicles-detail__section-heading">
      <span aria-hidden="true">{number}</span>
      <h2 id={id}>{children}</h2>
    </header>
  )
}

function OssicleFigure({ src, alt, caption }) {
  return (
    <figure className="ear-ossicles-detail__figure">
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

function EarOssiclesDetail() {
  return (
    <div className="ear-ossicles-detail" aria-label="Ear ossicles project details">
      <section className="ear-ossicles-detail__section" aria-labelledby="ear-introduction">
        <SectionHeading number="01" id="ear-introduction">Introduction</SectionHeading>
        <p>The middle ear transmits sound vibrations from the tympanic membrane to the inner ear through three small bones: the malleus, incus, and stapes. Their mechanical properties and connections influence how vibrations travel through this system.</p>
        <p>This project investigated the vibrational behaviour of the three ossicles using CAD modeling and finite-element modal analysis. The objective was to examine how changes in ossicle density affect the system's modal frequency response and explore the relationship between these changes and middle-ear disorders.</p>
      </section>

      <section className="ear-ossicles-detail__section" aria-labelledby="ear-cad-modeling">
        <SectionHeading number="02" id="ear-cad-modeling">CAD Modeling</SectionHeading>
        <p>The malleus, incus, and stapes were modeled in Fusion 360 using dimensions estimated from anatomical images and existing models. Their sizes range from approximately 8 mm for the malleus to 2.5 mm for the stapes.</p>
        <p>The resulting CAD models provided the geometry for finite-element modal analysis in ANSYS. The individual ossicles were analyzed separately before the connected structure was investigated under different assumed material densities.</p>
      </section>

      <section className="ear-ossicles-detail__section" aria-labelledby="ear-methodology">
        <SectionHeading number="03" id="ear-methodology">Modal Analysis Methodology</SectionHeading>
        <p>ANSYS was used to investigate the modal response of the ossicles individually and as an assembled structure. The analysis examined their modal frequencies and associated deformation patterns.</p>
        <p>The density-variation study used the following baseline material densities:</p>
        <ul className="ear-ossicles-detail__data-list">
          <li><strong>Malleus:</strong> 2.39 mg/mm³</li>
          <li><strong>Incus:</strong> 2.15 mg/mm³</li>
          <li><strong>Stapes:</strong> 2.80 mg/mm³</li>
        </ul>
        <p>Further simulations varied the assumed ossicle densities to examine changes in the frequency response. A separate investigation varied the assigned properties of the connecting muscles to determine whether those changes affected the response.</p>
      </section>

      <section className="ear-ossicles-detail__section" aria-labelledby="ear-results">
        <SectionHeading number="04" id="ear-results">Results and Analysis</SectionHeading>

        <div className="ear-ossicles-detail__subsection">
          <h3>Individual modal analysis</h3>
          <p>The individual-ossicle modal frequencies were:</p>
          <ul className="ear-ossicles-detail__data-list">
            <li><strong>Malleus:</strong> 3.8367 Hz</li>
            <li><strong>Stapes:</strong> 3.1687 Hz</li>
            <li><strong>Incus:</strong> 0.67146 Hz</li>
          </ul>
          <p>The assembled structure had a modal frequency of 0.56171 Hz in the initial analysis.</p>
        </div>

        <div className="ear-ossicles-detail__figures" aria-label="Individual ossicle modal analysis figures">
          {ossicleFigures.map((figure) => <OssicleFigure key={figure.caption} {...figure} />)}
        </div>

        <div className="ear-ossicles-detail__subsection">
          <h3>Effect of ossicle density</h3>
          <p>The density-variation study produced the following frequency responses:</p>
          <ul className="ear-ossicles-detail__data-list">
            <li><strong>Baseline density:</strong> 0.99882 Hz</li>
            <li><strong>Three-quarter density:</strong> 1.4128 Hz</li>
            <li><strong>Half density:</strong> 8.006 Hz</li>
          </ul>
          <p>Reducing the assigned ossicle densities was associated with an increase in the calculated frequency response. As density decreased from the baseline case to half the baseline value, the frequency response increased from 0.99882 Hz to 8.006 Hz.</p>
          <p>These results illustrate the relationship observed in the density-variation study.</p>
        </div>

        <div className="ear-ossicles-detail__subsection">
          <h3>Derived density–frequency relationship</h3>
          <p>Exponential curve fitting was used to derive a mathematical relationship between ossicle density and frequency response.</p>
          <div className="ear-ossicles-detail__equation" role="math" aria-label="Rho equals 1.229991 plus 6.626471 times e to the power of negative 1.694214 f">
            <span>ρ = 1.229991 + 6.626471e<sup>−1.694214f</sup></span>
          </div>
          <ul className="ear-ossicles-detail__variables">
            <li><strong>ρ:</strong> density of the ear ossicles, in mg/mm³.</li>
            <li><strong>f:</strong> frequency response, in Hz.</li>
          </ul>
          <p>The equation expresses the relationship between the density of the ear ossicles and their frequency response. It shows an inverse relationship: as the frequency response increases, the corresponding density decreases according to the fitted equation.</p>
          <p>The study used frequency response as the independent variable because it can be measured conveniently. The equation can also be rearranged to estimate frequency response when density is the known quantity:</p>
          <div className="ear-ossicles-detail__equation ear-ossicles-detail__equation--rearranged" role="math" aria-label="f equals negative one over 1.694214 times the natural logarithm of rho minus 1.229991 divided by 6.626471">
            <span>f = −<span className="ear-ossicles-detail__fraction"><span>1</span><span>1.694214</span></span> ln<span className="ear-ossicles-detail__argument">(</span><span className="ear-ossicles-detail__fraction"><span>ρ − 1.229991</span><span>6.626471</span></span><span className="ear-ossicles-detail__argument">)</span></span>
          </div>
          <p>These equations provide a mathematical way to relate density and frequency response in the study and can help examine changes in ossicle density associated with different diseases/medical conditions.</p>
        </div>

        <div className="ear-ossicles-detail__subsection">
          <h3>Effect of connecting-muscle properties</h3>
          <p>Changing the assigned density or stiffness of the connecting muscles produced no appreciable change in the frequency response. The analysis therefore found no appreciable correlation between these muscle-property changes and the calculated response under the investigated conditions.</p>
        </div>
      </section>

      <section className="ear-ossicles-detail__section" aria-labelledby="ear-conclusion">
        <SectionHeading number="05" id="ear-conclusion">Conclusion</SectionHeading>
        <p>The project investigated the vibrational behaviour of the middle-ear ossicles using CAD modeling and finite-element modal analysis. Individual modal frequencies were calculated for the malleus, incus, and stapes, and the assembled structure was studied under variations in ossicle density and connecting-muscle properties.</p>
        <p>The density-variation study showed an increase in frequency response as the assigned ossicle densities decreased. An exponential equation was derived to express the relationship between density and frequency response, providing a mathematical basis for relating these two quantities. Changes in the assigned connecting-muscle properties produced no appreciable change in the calculated response.</p>
        <p>The study demonstrates the use of mechanical modeling and simulation to investigate the vibrational behaviour of biological structures and explore how changes in material properties relate to their mechanical response.</p>
      </section>
    </div>
  )
}

export default EarOssiclesDetail
