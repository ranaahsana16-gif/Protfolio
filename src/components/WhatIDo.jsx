import '../styles/WhatIDo.css'

const WhatIDo = () => {
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>I<span className="do-h2"> DO</span></div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in" style={{ display: 'flex' }}>
          <div className="what-border2">
            <svg width="100%">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
              <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
            </svg>
          </div>

          <div className="what-content what-noTouch">
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner" />
            <div className="what-content-in">
              <h3>DEVELOP</h3>
              <p>Engineering robust, scalable, and high-performance business applications, native mobile apps, POS systems, and SaaS platforms.</p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Flutter</div>
                <div className="what-tags">Next.js</div>
                <div className="what-tags">React</div>
                <div className="what-tags">Firebase</div>
                <div className="what-tags">Supabase</div>
                <div className="what-tags">Full-Stack</div>
              </div>
              <div className="what-arrow" />
            </div>
          </div>

          <div className="what-content what-noTouch">
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner" />
            <div className="what-content-in">
              <h3>DESIGN</h3>
              <p>Crafting conversion-oriented user experiences, interactive wireframes, product prototypes, and modern UI architectures.</p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">UI/UX Design</div>
                <div className="what-tags">Figma</div>
                <div className="what-tags">Prototyping</div>
                <div className="what-tags">Wireframing</div>
                <div className="what-tags">Graphic Design</div>
                <div className="what-tags">Brand Identity</div>
              </div>
              <div className="what-arrow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatIDo
