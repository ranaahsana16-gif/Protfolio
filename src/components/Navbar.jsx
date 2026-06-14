import '../styles/Navbar.css'

const HoverLink = ({ text }) => (
  <div className="hover-link" data-cursor="disable">
    <div className="hover-in">
      {text} <div>{text}</div>
    </div>
  </div>
)

const Navbar = () => {
  const handleNavClick = (e) => {
    e.preventDefault()
    const href = e.currentTarget.getAttribute('data-href')
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Rana Ahsan
        </a>
        <a href="mailto:tillnexhq@gmail.com" className="navbar-connect" data-cursor="disable">
          tillnexhq@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about" onClick={handleNavClick}>
              <HoverLink text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work" onClick={handleNavClick}>
              <HoverLink text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact" onClick={handleNavClick}>
              <HoverLink text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>
      <div className="landing-circle1" />
      <div className="landing-circle2" />
      <div className="nav-fade" />
    </>
  )
}

export default Navbar
export { HoverLink }
