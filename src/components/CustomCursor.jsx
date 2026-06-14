import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import '../styles/Cursor.css'

const CustomCursor = () => {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    
    // Check if touch device
    if ('ontouchstart' in window) return

    const mouse = { x: 0, y: 0 }
    const pos = { x: 0, y: 0 }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    document.addEventListener('mousemove', handleMouseMove)

    let animFrame
    const animate = () => {
      pos.x += (mouse.x - pos.x) / 6
      pos.y += (mouse.y - pos.y) / 6
      cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      animFrame = requestAnimationFrame(animate)
    }
    animFrame = requestAnimationFrame(animate)

    // Handle data-cursor attributes using event delegation
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) {
        const type = target.getAttribute('data-cursor')
        if (type === 'disable') {
          cursor.classList.add('cursor-disable')
        } else if (type === 'icons') {
          cursor.classList.add('cursor-icons')
        }
      }
    }

    const handleMouseOut = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) {
        cursor.classList.remove('cursor-disable', 'cursor-icons')
      }
    }

    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(animFrame)
    }
  }, [])

  return <div className="cursor-main" ref={cursorRef} />
}

export default CustomCursor
