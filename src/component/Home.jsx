import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const allRoutes = [
        {id: 1, name: 'Home', path: '/',},
        {id: 2, name: 'Download Offer Letter', path: '/download-offer-letter'},
        {id: 3, name: 'Submit Form', path: '/submit-form'},
      ]
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Home</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
            {allRoutes.map((route) => (
                <button 
                    key={route.id} 
                    onClick={() => navigate(route.path)} 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                    {route.name}
                </button>
            ))}
        </div>
    </div>
  )
}

export default Home