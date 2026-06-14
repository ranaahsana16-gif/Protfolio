import { useState, useEffect, useRef } from 'react'
import Marquee from 'react-fast-marquee'
import { useLoading } from './LoadingProvider'

const MarqueeComponent = Marquee.default || Marquee

const LoadingScreen = ({ percent }) => {
  const { setIsLoading } = useLoading()
  const [complete, setComplete] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const timersRef = useRef([])

  useEffect(() => {
    if (percent >= 100 && !complete) {
      const id = setTimeout(() => {
        setComplete(true)
      }, 500)
      timersRef.current.push(id)
    }

    return () => {
      // Clear all timers on cleanup/unmount
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [percent, complete])

  const handleClick = () => {
    if (!complete || clicked) return
    setClicked(true)

    if (typeof window !== 'undefined' && window.startCharacter3D) {
      window.startCharacter3D()
    }

    const addTimeout = (cb, delay) => {
      const id = setTimeout(cb, delay)
      timersRef.current.push(id)
      return id
    }

    addTimeout(() => {
      setFadeOut(true)
      addTimeout(() => {
        setIsLoading(false)
      }, 600)
    }, 800)
  }

  function handleMouseMove(e) {
    const { currentTarget } = e
    const rect = currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    currentTarget.style.setProperty('--mouse-x', `${x}px`)
    currentTarget.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div className={`loading-screen ${fadeOut ? 'loading-screen-out' : ''}`}>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          RANA AHSAN
        </a>
        <div className="loaderGame">
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, i) => (
                <div className="loaderGame-line" key={i} />
              ))}
            </div>
            <div className="loaderGame-ball" />
          </div>
        </div>
      </div>

      <div className="loading-screen">
        <div className="loading-marquee">
          <MarqueeComponent>
            <span> A Creative Developer</span>{' '}
            <span>A Creative Designer</span>
            <span> A Creative Developer</span>{' '}
            <span>A Creative Designer</span>
          </MarqueeComponent>
        </div>

        <div
          className={`loading-wrap ${clicked ? 'loading-clicked' : ''}`}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        >
          <div className="loading-hover" />
          <div className={`loading-button ${complete ? 'loading-complete' : ''}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{Math.min(percent, 100)}%</span>
                </div>
              </div>
              <div className="loading-box" />
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
