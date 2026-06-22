import '../styles/About.css'

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-left">
        <div className="terminal-card">
          <div className="terminal-header">
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
            <span className="terminal-title">rana_ahsan.sh</span>
          </div>
          <div className="terminal-body">
            <p><span className="t-green">~$</span> cat profile.json</p>
            <pre>
{`{
  "name": "Rana Ahsan",
  "role": "Founder & CEO",
  "company": "TillNex",
  "skills": ["Full-Stack", "Flutter", "UI/UX"],
  "achievements": [
    "POS & SaaS Builder"
  ],
  "communication": "Excellent"
}`}
            </pre>
          </div>
        </div>
      </div>
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I am a Computer Science student at Angels College Faisalabad and the Founder & CEO of TillNex. I specialize in engineering high-performance digital solutions, including scalable POS systems, SaaS products, and custom mobile and web applications. Passionate about solving complex business challenges, my focus is on designing secure, user-centric systems that drive operational efficiency and growth.
        </p>
        <div className="about-info-grid">
          <div className="about-info-col">
            <h4>Core Expertise</h4>
            <ul>
              <li>Full-Stack Web Development (Next.js, React)</li>
              <li>Mobile App Development (Flutter, Android)</li>
              <li>UI/UX Design (Figma, Adobe Suite)</li>
              <li>SaaS & POS System Architecture</li>
              <li>Cloud Databases (Firebase, Supabase)</li>
            </ul>
          </div>
          <div className="about-info-col">
            <h4>Communication & Languages</h4>
            <ul>
              <li>English & Urdu (Fluent & Bilingual)</li>
              <li>French & German (Conversational)</li>
            </ul>
          </div>
          <div className="about-info-col">
            <h4>Achievements</h4>
            <ul>
              <li>Founder & CEO of TillNex</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
