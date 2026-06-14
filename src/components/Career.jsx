import '../styles/Career.css'

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>My career <span>&</span><br /> experience</h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot" />
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Founder & CEO</h4>
                <h5>TillNex (tillnex.space)</h5>
              </div>
              <h3>Present</h3>
            </div>
            <p>
              • Architecting scalable SaaS products, Point of Sale (POS) solutions, and custom business management systems.<br />
              • Directing full-stack product development lifecycle, from UI/UX wireframing in Figma to deployment.<br />
              • Partnering with businesses to automate workflows, integrate secure payment/data APIs, and scale digital operations.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Computer Science Undergraduate</h4>
                <h5>Angels College Faisalabad</h5>
              </div>
              <h3>Active</h3>
            </div>
            <p>
              • Focusing on software engineering principles, advanced database design, and algorithmic problem-solving.<br />
              • Translating academic knowledge directly into real-world business applications under TillNex.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Freelance Full-Stack & Flutter Developer</h4>
                <h5>Independent Consultant</h5>
              </div>
              <h3>2023-Present</h3>
            </div>
            <p>
              • Developed cross-platform mobile apps for Android and iOS using Flutter with Firebase/Supabase integrations.<br />
              • Built high-performance, responsive custom websites for startups and local service businesses.<br />
              • Designed intuitive user interfaces and modern wireframes, improving user retention and client conversion rates.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Career
