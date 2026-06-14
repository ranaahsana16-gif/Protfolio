import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { TbFileDescription } from 'react-icons/tb'
import { HoverLink } from './Navbar'
import '../styles/Icons.css'

const BASE = import.meta.env.BASE_URL

const SocialIcons = () => {
  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/ranaahsana14-maker" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href="https://www.linkedin.com/in/ranaahsanhq/" target="_blank" rel="noreferrer">
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href="https://wa.me/16677788789" target="_blank" rel="noreferrer">
            <FaWhatsapp />
          </a>
        </span>
      </div>
      <a
        className="resume-button"
        href={`${BASE}resume.html`}
        target="_blank"
        rel="noreferrer"
      >
        <HoverLink text="RESUME" />
        <span><TbFileDescription /></span>
      </a>
    </div>
  )
}

export default SocialIcons
