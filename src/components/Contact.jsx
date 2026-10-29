import { contact } from '../data/portfolio.js'

function Contact() {
  return (
    <section className="contact page-shell" id="contact" aria-labelledby="contact-heading">
      <div className="contact__panel">
        <p className="eyebrow"><span className="eyebrow__rule" /> CONTACT</p>
        <h2 id="contact-heading">Let’s engineer a better quality of life.</h2>
        <p>I want to pursue an M.S. in Mechanical Engineering to go beyond applying existing tools and develop a deeper understanding of how mechanical systems behave. I'm particularly interested in computational mechanics, robotics, and human centered design, and in turning mathematical models into technologies that work in the real world.</p>
        <div className="contact__actions">
          <a className="button button--primary" href={`mailto:${contact.email}`}>bijoylall2012@gmail.com <span aria-hidden="true">↗</span></a>
          <a className="button button--outline" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  )
}

export default Contact
