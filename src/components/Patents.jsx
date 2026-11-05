function Patents() {
  return (
    <section className="patent page-shell" id="patent" aria-labelledby="patent-heading">
      <div className="section-heading section-heading--stacked">
        <p className="eyebrow"><span className="eyebrow__rule" /> PATENTS</p>
        <h2 id="patent-heading">Innovations in Occupant Safety</h2>
      </div>
      <p className="patent__description">Inventor of 4 patent-pending technologies focused on preventing severe injuries in car crashes. <strong className="patent__filing">Filed at the Patent Offices of India and Germany.</strong></p>
      <p className="patent__description">Advanced occupant protection through iterative simulation, hardware testing, and design refinement, translating engineering analysis into innovative crash-safety solutions.</p>
      <div className="patent__cards">
        <article className="patent-card">
          <h3><span className="patent-card__number" aria-hidden="true">01</span> &quot;A Reinforceable Seatbelt Assembly for a Vehicle.&quot;</h3>
          <p>A novel concept seat belt capable of dynamically adjusting its stiffness in the event of a crash, thus mitigating injuries due to localized abdominal loading by effectively distributing crash forces.</p>
        </article>
        <article className="patent-card">
          <h3><span className="patent-card__number" aria-hidden="true">02</span> &quot;An Occupant Restraint System for a Vehicle.&quot;</h3>
          <p>An electronically monitored seat belt so as to control the length of the belt as per the tension developed in it during crash, and prevent serious injuries due to violent sliding of the belt.</p>
        </article>
        <article className="patent-card">
          <h3><span className="patent-card__number" aria-hidden="true">03</span> &quot;A Novel Occupant Restraint System for a Vehicle.&quot;</h3>
          <p>An electronically monitored seat belt, with a crash-detected length extension mechanism, which improves occupant restraint performance.</p>
        </article>
        <article className="patent-card">
          <h3><span className="patent-card__number" aria-hidden="true">04</span> &quot;Crash-triggered Biomechanically calibrated Energy Absorbing Footwell Module&quot;</h3>
          <p>A mechanism that prevents serious injury caused by the impact of the occupant’s legs against the body of the car in case of a crash.</p>
        </article>
      </div>
    </section>
  )
}

export default Patents
