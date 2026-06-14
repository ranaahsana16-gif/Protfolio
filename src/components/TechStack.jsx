import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Physics, RigidBody, BallCollider, CylinderCollider } from '@react-three/rapier'
import { Environment } from '@react-three/drei'
import { EffectComposer, N8AO } from '@react-three/postprocessing'
import * as THREE from 'three'
import Marquee from 'react-fast-marquee'
import '../styles/TechStack.css'

const MarqueeComponent = Marquee.default || Marquee


const BASE = import.meta.env.BASE_URL

const imagePaths = [
  "images/react2.webp",
  "images/next2.webp",
  "images/node2.webp",
  "images/express.webp",
  "images/mongo.webp",
  "images/mysql.webp",
  "images/typescript.webp",
  "images/javascript.webp",
  "images/photoshop.png",
  "images/illustrator.png",
  "images/figma.png"
];

function FloatingSphere({ scale, material, isActive, vec = new THREE.Vector3() }) {
  const ref = useRef(null)
  const randSpread = (val) => (Math.random() - 0.5) * val

  useFrame((state, delta) => {
    if (!isActive || !ref.current) return
    const d = Math.min(0.1, delta)
    const translation = ref.current.translation()
    // Attraction force pulling towards center (0, 0, 0)
    const force = vec.copy(translation).normalize().multiplyScalar(-50 * d * scale)
    ref.current.applyImpulse(force, true)
  })

  // Initial random position spread
  const initialPos = useMemo(() => [
    randSpread(20),
    randSpread(20) - 25,
    randSpread(20) - 10
  ], [])

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={initialPos}
      ref={ref}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh castShadow receiveShadow scale={scale} rotation={[0.3, 1, 1]} material={material}>
        <sphereGeometry args={[1, 28, 28]} />
      </mesh>
    </RigidBody>
  )
}

function Pointer({ isActive, vec = new THREE.Vector3() }) {
  const ref = useRef(null)
  
  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return
    const targetX = (pointer.x * viewport.width) / 2
    const targetY = (pointer.y * viewport.height) / 2
    const target = vec.lerp(new THREE.Vector3(targetX, targetY, 0), 0.2)
    ref.current.setNextKinematicTranslation(target)
  })

  return (
    <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2]} />
    </RigidBody>
  )
}

export default function TechStack({ isDesktop }) {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!isDesktop) return

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      const workEl = document.getElementById("work")
      if (workEl) {
        const rect = workEl.getBoundingClientRect()
        // Activate physics when scrolled near the work/techstack threshold
        setIsActive(scrollY > rect.top + scrollY - 300)
      }
    }

    const headers = document.querySelectorAll(".header a")
    headers.forEach(h => {
      h.addEventListener("click", () => {
        const timer = setInterval(handleScroll, 10)
        setTimeout(() => clearInterval(timer), 1000)
      })
    })

    window.addEventListener("scroll", handleScroll)
    handleScroll() // run initial check
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDesktop])

  // Preload and memoize physical materials mapping tech logos
  const materials = useMemo(() => {
    if (!isDesktop) return []
    const loader = new THREE.TextureLoader()
    return imagePaths.map(p => {
      const tex = loader.load(`${BASE}${p}`)
      return new THREE.MeshPhysicalMaterial({
        map: tex,
        emissive: "#ffffff",
        emissiveMap: tex,
        emissiveIntensity: 0.3,
        metalness: 0.5,
        roughness: 1,
        clearcoat: 0.1
      })
    })
  }, [isDesktop])

  const sphereData = useMemo(() => {
    if (!isDesktop) return []
    const scales = [0.7, 1, 0.8, 1, 1]
    return [...Array(15)].map((_, idx) => ({
      scale: scales[Math.floor(Math.random() * scales.length)],
      materialIdx: idx % materials.length
    }))
  }, [materials.length, isDesktop])

  if (!isDesktop) {
    return (
      <div className="techstack-mobile" id="techstack">
        <h2>My Techstack</h2>
        <div className="tech-marquee-container">
          <MarqueeComponent speed={35} gradient={false} pauseOnHover={true}>
            {imagePaths.map((p, idx) => {
              const name = p.split('/').pop().split('.')[0].replace('2', '');
              const displayName = name === 'mongo' ? 'MongoDB' : name.charAt(0).toUpperCase() + name.slice(1);
              return (
                <div key={idx} className="tech-logo-card">
                  <img src={`${BASE}${p}`} alt={displayName} />
                  <span>{displayName}</span>
                </div>
              );
            })}
          </MarqueeComponent>
        </div>
      </div>
    )
  }

  return (
    <div className="techstack" id="techstack">
      <h2>My Techstack</h2>
      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 1.5
        }}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {sphereData.map((d, idx) => (
            <FloatingSphere
              key={idx}
              scale={d.scale}
              material={materials[d.materialIdx]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files={`${BASE}models/char_enviorment.hdr`}
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
