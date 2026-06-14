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

gsap.registerPlugin(ScrollTrigger)

const TechStack = lazy(() => import('./TechStack'))

const MainContainer = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024)
  const [loadTechStack, setLoadTechStack] = useState(false)
  const techStackRef = useRef(null)

  useEffect(() => {
    if (!isDesktop) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadTechStack(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px' }
    )

    const el = techStackRef.current
    if (el) {
      observer.observe(el)
    }

    return () => {
      observer.disconnect()
    }
  }, [isDesktop])

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024)
    }

    // Initialize GSAP animations
    initAnimations()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isDesktop])

  useEffect(() => {
    // Animate career timeline on scroll
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

    // Nav fade on scroll
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
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    // Section scroll transitions
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
      .fromTo('.about-me', { y: '-50%' }, { y: '0%' }, 0)

    const scrollTimeline2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-section',
        start: 'center 55%',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true
      }
    })

    scrollTimeline2.to('.about-section', { y: '30%', duration: 6 }, 0)
      .to('.about-section', { opacity: 0, delay: 3, duration: 2 }, 0)
      .fromTo('.what-box-in', { display: 'none' }, { display: 'flex', duration: 0.1, delay: 6 }, 0)

    const scrollTimeline3 = gsap.timeline({
      scrollTrigger: {
        trigger: '.whatIDO',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true
      }
    })

    scrollTimeline3.fromTo('.whatIDO', { y: 0 }, { y: '15%', duration: 2 }, 0)

    return () => {
      scrollTimeline1.scrollTrigger?.kill()
      scrollTimeline1.kill()
      scrollTimeline2.scrollTrigger?.kill()
      scrollTimeline2.kill()
      scrollTimeline3.scrollTrigger?.kill()
      scrollTimeline3.kill()
    }
  }, [isDesktop])

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
              {isDesktop && loadTechStack && (
                <Suspense fallback={<div>Loading....</div>}>
                  <TechStack />
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

function initAnimations() {
  if (window.innerWidth < 900) return

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
          toggleActions: 'play pause resume reverse',
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
          toggleActions: 'play pause resume reverse',
          start: startPos,
        },
        duration: 0.8,
        ease: 'power2.inOut',
        y: 0,
      }
    )
  })
}

export default MainContainer
