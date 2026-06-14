import '../styles/Landing.css'

const Landing = () => {
  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-circle-center" />
      <div className="landing-container">
        <div className="landing-intro">
          <h2>Hello! I'm</h2>
          <h1>RANA<br /><span>AHSAN</span></h1>
        </div>
        <div className="landing-info">
          <h3>A Creative</h3>
          <h2 className="landing-title-text">Developer & Designer</h2>
        </div>
      </div>
    </div>
  )
}

export default Landing
