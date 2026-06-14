import { MdOutlineOpenInNew, MdCopyright } from 'react-icons/md'
import '../styles/Contact.css'

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:tillnexhq@gmail.com" data-cursor="disable">
                tillnexhq@gmail.com
              </a>
              <br />
              <a href="mailto:ranaahsana14@gmail.com" data-cursor="disable" style={{ fontSize: '14px', opacity: 0.8 }}>
                ranaahsana14@gmail.com
              </a>
            </p>
            <h4>Phone / WhatsApp</h4>
            <p>
              <a href="https://wa.me/16677788789" target="_blank" data-cursor="disable" rel="noreferrer">
                +1 (667) 778-8789
              </a>
            </p>
            <h4>Location</h4>
            <p style={{ color: 'white', fontSize: 'var(--para-size)', fontWeight: 300, margin: 0, textTransform: 'capitalize' }}>
              Faisalabad, Pakistan
            </p>
          </div>

          <div className="contact-box">
            <h4>Social & Web</h4>
            <a href="https://tillnex.space" target="_blank" data-cursor="disable" className="contact-social" rel="noreferrer">
              Website <MdOutlineOpenInNew />
            </a>
            <a href="https://github.com/ranaahsana14-maker" target="_blank" data-cursor="disable" className="contact-social" rel="noreferrer">
              Github <MdOutlineOpenInNew />
            </a>
            <a href="https://www.linkedin.com/in/ranaahsanhq/" target="_blank" data-cursor="disable" className="contact-social" rel="noreferrer">
              Linkedin <MdOutlineOpenInNew />
            </a>
          </div>

          <div className="contact-box">
            <h2>Designed and Developed <br /> by <span>Rana Ahsan</span></h2>
            <h5><MdCopyright /> 2026</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
