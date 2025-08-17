import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import './App.css'

const Home = lazy(() => import('./component/Home'))
const DownloadOfferLetter = lazy(() => import('./component/DownloadOfferLetter'))
const SubmitForm = lazy(() => import('./component/SubmitFrom'))

function App() {
  const allRoutes = [
    {id: 1, name: 'Home', path: '/', component: <Home />},
    {id: 2, name: 'Download Offer Letter', path: '/download-offer-letter', component: <DownloadOfferLetter />},
    {id: 3, name: 'Submit Form', path: '/submit-form', component: <SubmitForm />},
  ]

  return (
    <>
      <Suspense fallback={
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }>
        <Routes>
          {allRoutes.map((route) => (
            <Route key={route.id} path={route.path} element={route.component} />
          ))}
        </Routes>
      </Suspense>
    </>
  )
}

export default App
