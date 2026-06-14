import { Suspense, lazy } from 'react'
import { LoadingProvider } from './components/LoadingProvider'

const MainContainer = lazy(() => import('./components/MainContainer'))

function App() {
  return (
    <>
      <LoadingProvider>
        <Suspense fallback={null}>
          <MainContainer />
        </Suspense>
      </LoadingProvider>
    </>
  )
}

export default App
