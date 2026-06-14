import { useEffect, useState, Suspense, lazy, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './Navbar'
import Landing from './Landing'
import About from './About'
import WhatIDo from './WhatIDo'
import Career from './Career'
import Work from './Work'
import Contact from './Contact'
import SocialIcons from './SocialIcons'
import CustomCursor from './CustomCursor'
import { useLoading } from './LoadingProvider'

gsap.registerPlugin(ScrollTrigger)

const TechStack = lazy(() => import('./TechStack'))

const MainContainer = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024)
  const [loadTechStack, setLoadTechStack] = useState(true)
  const techStackRef = useRef(null)
  const { isLoading } = useLoading()

  useEffect(() => {
    if (isLoading) return

    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } })

    // Set initial hidden states for premium liquid-reveal
    gsap.set('.header', { y: -30, scaleX: 0.82, opacity: 0 })
    gsap.set('.social-icons span', { x: -40, opacity: 0 })
    gsap.set('.resume-button', { x: 40, opacity: 0 })
    gsap.set('.landing-intro h2', { y: 20, opacity: 0, letterSpacing: '6px' })
    gsap.set('.landing-intro h1', { y: 60, scale: 0.92, opacity: 0, letterSpacing: '6px' })
    gsap.set('.landing-info h3', { y: 20, opacity: 0, letterSpacing: '6px' })
    gsap.set('.landing-title-text', { y: 40, scale: 0.95, opacity: 0, letterSpacing: '8px' })
    gsap.set('.landing-circle-center', { scale: 0.3, opacity: 0 })
    gsap.set('.dot-background-container', { opacity: 0 })

    // Animate elements sequentially
    tl.to('.landing-circle-center', { scale: 1, opacity: 1, duration: 2.2, ease: 'power2.out' }, 0)
      .to('.dot-background-container', { opacity: 0.65, duration: 2.5, ease: 'power2.out' }, 0.1)
      .to('.header', { y: 0, scaleX: 1, opacity: 1, duration: 1.4, ease: 'power4.out' }, 0.15)
      .to('.landing-intro h2', { y: 0, opacity: 1, letterSpacing: '3px', duration: 1.2 }, 0.25)
      .to('.landing-intro h1', { y: 0, scale: 1, opacity: 1, letterSpacing: '2px', duration: 1.5 }, 0.35)
      .to('.landing-info h3', { y: 0, opacity: 0.8, letterSpacing: '3px', duration: 1.2 }, 0.45)
      .to('.landing-title-text', { y: 0, scale: 1, opacity: 1, letterSpacing: '4px', duration: 1.6 }, 0.55)
      .to('.social-icons span', { x: 0, opacity: 1, stagger: 0.08, duration: 1.1 }, 0.65)
      .to('.resume-button', { x: 0, opacity: 1, duration: 1.2 }, 0.75)
  }, [isLoading])

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const mm = gsap.matchMedia()

    // Desktop only scroll animations
    mm.add('(min-width: 1025px)', () => {
      const scrollTimeline1 = gsap.timeline({
        scrollTrigger: {
          trigger: '.landing-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true
        }
      })

      scrollTimeline1.to('.landing-container', { opacity: 0, duration: 0.4 }, 0)
        .to('.landing-container', { y: '40%', duration: 0.8 }, 0)

      const scrollTimeline2 = gsap.timeline({
        scrollTrigger: {
          trigger: '.about-section',
          start: 'center 55%',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true
        }
      })

      scrollTimeline2.to('.about-section', { opacity: 0, duration: 2 }, 0)
    })

    // Scroll reveal animations for text elements (min-width: 900px)
    mm.add('(min-width: 900px)', () => {
      ScrollTrigger.config({ ignoreMobileResize: true })

      const paras = document.querySelectorAll('.para')
      const titles = document.querySelectorAll('.title')
      const startPos = window.innerWidth <= 1024 ? 'top 60%' : '20% 60%'

      paras.forEach((para) => {
        para.classList.add('visible')
        gsap.fromTo(
          para,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            scrollTrigger: {
              trigger: para.parentElement?.parentElement,
              toggleActions: 'play none none none', // Play once when scrolling down; never hide on scroll up!
              start: startPos,
            },
            duration: 1,
            ease: 'power3.out',
            y: 0,
          }
        )
      })

      titles.forEach((title) => {
        gsap.fromTo(
          title,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            scrollTrigger: {
              trigger: title.parentElement?.parentElement,
              toggleActions: 'play none none none', // Play once when scrolling down; never hide on scroll up!
              start: startPos,
            },
            duration: 0.8,
            ease: 'power2.inOut',
            y: 0,
          }
        )
      })
    })

    // Timeline line growth on scroll (all screen widths)
    ScrollTrigger.create({
      trigger: '.career-section',
      start: 'top 80%',
      end: 'bottom 20%',
      onUpdate: (self) => {
        const timeline = document.querySelector('.career-timeline')
        if (timeline) {
          timeline.style.maxHeight = `${self.progress * 100}%`
        }
      },
    })

    // Navbar background fade on scroll (all screen widths)
    ScrollTrigger.create({
      trigger: '.landing-section',
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        const navFade = document.querySelector('.nav-fade')
        if (navFade) {
          navFade.style.opacity = self.progress > 0.1 ? '1' : '0'
        }
      },
    })

    return () => {
      mm.revert() // Destroys all triggers and resets elements to pre-animation styles automatically!
    }
  }, [])

  return (
    <div className="container-main">
      <CustomCursor />
      <Navbar />
      <SocialIcons />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing />
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <div ref={techStackRef}>
              {loadTechStack && (
                <Suspense fallback={<div>Loading....</div>}>
                  <TechStack isDesktop={isDesktop} />
                </Suspense>
              )}
            </div>
            <Contact />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainContainer
