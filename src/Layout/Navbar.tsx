import React from 'react'
import { Link } from 'react-router-dom'

const routes = [
  {
    to: '/',
    label: 'Home',
    id: 'home'
  },
  {
    to: '/about',
    label: 'About',
    id: 'about'
  },
  {
    to: '/contact',
    label: 'Contact',
    id: 'contact'
  }
] as const

const Navbar = () => {
  return (
    <div className="w-screen shadow">
      <div className="max-w-3xl mx-auto px-4 py-2 flex flex-row justify-between">
        <Link to={'/'} className="text-xl">
          Logo
        </Link>
        <div className="flex flex-row gap-1">
          {routes.map((route) => (
            <Link
              to={route.to}
              key={route.id}
              className="text-base text-gray-300 px-2 rounded-sm hover:bg-gray-700 flex items-center justify-center">
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar
