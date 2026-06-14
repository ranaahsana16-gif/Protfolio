import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MdOutlineOpenInNew } from 'react-icons/md'
import '../styles/Work.css'

gsap.registerPlugin(ScrollTrigger)

const BASE = import.meta.env.BASE_URL

const WorkImage = ({ image, alt, link }) => {
  return (
    <div className="work-image">
      <a className="work-image-in" href={link || '#'} target="_blank" data-cursor="disable" rel="noreferrer">
        {link && (
          <div className="work-link">
            <MdOutlineOpenInNew />
          </div>
        )}
        <img src={`${BASE}${image}`} alt={alt} />
      </a>
    </div>
  )
}

const Work = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth < 1025) return

    const section = sectionRef.current
    if (!section) return

    const workBoxes = section.querySelectorAll('.work-box')
    const workFlex = section.querySelector('.work-flex')
    if (!workBoxes.length || !workFlex) return

    const containerLeft = section.querySelector('.work-container').getBoundingClientRect().left
    const boxRect = workBoxes[0].getBoundingClientRect()
    const parentWidth = workBoxes[0].parentElement.getBoundingClientRect().width
    const padding = parseInt(window.getComputedStyle(workBoxes[0]).padding) / 2
    const scrollDistance = boxRect.width * workBoxes.length - (containerLeft + parentWidth) + padding

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.work-section',
        start: 'top top',
        end: `+=${scrollDistance}`,
        scrub: true,
        pin: true,
        id: 'work',
      },
    })

    tl.to('.work-flex', { x: -scrollDistance, ease: 'none' })

    return () => {
      tl.kill()
      const st = ScrollTrigger.getById('work')
      if (st) st.kill()
    }
  }, [])

  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container">
        <h2>My <span>Work</span></h2>
        <div className="work-flex">
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>01</h3>
                <div>
                  <h4>NexPOS</h4>
                  <p>Point of Sale & Retail SaaS</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Next.js, Firebase, Supabase, Sales Analytics, Real-Time Billing, Inventory Control</p>
            </div>
            <WorkImage
              image="images/nexpos_mockup.png"
              alt="NexPOS Dashboard Interface"
            />
          </div>

          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>
                <div>
                  <h4>Online Food Ordering Platform</h4>
                  <p>Restaurant Operations Suite</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Flutter, Node.js, Custom Menu Manager, Kitchen Screens, Order Dispatch Pipeline</p>
            </div>
            <WorkImage
              image="images/food_ordering_mockup.png"
              alt="Food Ordering Application interface"
            />
          </div>

          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>03</h3>
                <div>
                  <h4>Custom Client Platforms</h4>
                  <p>Modern Business Websites</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Next.js, React, SEO Optimization, Conversion Funnel, Custom CRM/Email Forms</p>
            </div>
            <WorkImage
              image="images/client_website_mockup.png"
              alt="Client website design and interface"
            />
          </div>

          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>04</h3>
                <div>
                  <h4>Enterprise Software Solutions</h4>
                  <p>Operational Automation Tools</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Full-Stack Development, Supabase, Workflow Builder, Business Dashboard, Automated Reports</p>
            </div>
            <WorkImage
              image="images/business_software_mockup.png"
              alt="Business Software automation dashboard"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Work
