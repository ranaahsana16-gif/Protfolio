import { createContext, useContext, useState, useEffect } from 'react'
import LoadingScreen from './LoadingScreen'
import '../styles/Loading.css'

const LoadingContext = createContext(null)

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) throw new Error('useLoading must be used within a LoadingProvider')
  return context
}

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [percent, setPercent] = useState(0)

  const value = { isLoading, setIsLoading, setPercent }

  useEffect(() => {
    let current = 0
    let n = setInterval(() => {
      if (current < 100) {
        current += Math.round(Math.random() * 6) + 4
        if (current > 100) current = 100
        setPercent(current)
      } else {
        clearInterval(n)
      }
    }, 50)

    function clear() {
      clearInterval(n)
      setPercent(100)
    }

    function loaded() {
      return Promise.resolve(100)
    }

    window.loadingTracker = { loaded, percent: current, clear }

    return () => {
      clearInterval(n)
      delete window.loadingTracker
    }
  }, [])

  return (
    <LoadingContext.Provider value={value}>
      {isLoading && <LoadingScreen percent={percent} />}
      <main className={`main-body ${isLoading ? 'main-hidden' : 'main-visible'}`}>
        {children}
      </main>
    </LoadingContext.Provider>
  )
}
