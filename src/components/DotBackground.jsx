import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const DotBackground = () => {
  const containerRef = useRef(null)
  const originalPositions = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.z = 30

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Particles Geometry
    const count = 1200
    const positions = new Float32Array(count * 3)
    const randomShift = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Spread dots in a 3D field
      positions[i * 3] = (Math.random() - 0.5) * 80     // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60 // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40 // Z
      randomShift[i] = Math.random() * Math.PI * 2
    }

    // Backup the initial coordinates to compute mouse deflection relative to rest state
    originalPositions.current = new Float32Array(positions)

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // Dynamically draw a radial soft dot on a temporary canvas
    const createCircleTexture = () => {
      const matCanvas = document.createElement('canvas')
      matCanvas.width = 16
      matCanvas.height = 16
      const ctx = matCanvas.getContext('2d')
      
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
      gradient.addColorStop(0.3, 'rgba(194, 164, 255, 0.8)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 16, 16)
      
      return new THREE.CanvasTexture(matCanvas)
    }

    const texture = createCircleTexture()

    // Particles Material
    const material = new THREE.PointsMaterial({
      size: 0.35,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xc2a4ff // theme purple
    })

    // Points
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Mouse movement interactive variables (normalized to [-1, 1])
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)
      mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation variables
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()
      const positionsArr = points.geometry.attributes.position.array
      const orig = originalPositions.current

      // Interpolated parallax cursor response
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      // Project mouse coordinates into approximate WebGL scene coordinates
      const sceneWidth = 34.6
      const sceneHeight = sceneWidth / (width / height)
      const mx = targetX * (sceneWidth / 2)
      const my = -targetY * (sceneHeight / 2)

      // Animate individual particles and apply interactive cursor deflection
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const ox = orig[i3]
        const oy = orig[i3 + 1]
        const oz = orig[i3 + 2]

        // Apply a gentle sinusoidal drift to the y coordinate
        const waveY = Math.sin(elapsedTime + randomShift[i]) * 0.5

        // Calculate distance in scene space
        const dx = ox - mx
        const dy = (oy + waveY) - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        let px = ox
        let py = oy + waveY

        // If the particle is near the cursor, gently push it away in 2D space
        const pushRadius = 8
        if (dist < pushRadius) {
          const pushForce = (pushRadius - dist) / pushRadius * 1.8
          px += (dx / dist) * pushForce
          py += (dy / dist) * pushForce
        }

        positionsArr[i3] = px
        positionsArr[i3 + 1] = py
      }
      points.geometry.attributes.position.needsUpdate = true

      // Slow 3D rotation of the entire points cloud
      points.rotation.y = elapsedTime * 0.015
      points.rotation.x = elapsedTime * 0.008

      renderer.render(scene, camera)
    }

    animate()

    // Window Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight

      camera.aspect = w / h
      camera.updateProjectionMatrix()

      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      texture.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="dot-background-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    />
  )
}

export default DotBackground
