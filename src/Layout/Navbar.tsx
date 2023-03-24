import clsx from 'clsx'
import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'

import { usePathName } from '../hooks'

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
  const pathName = usePathName()

  return (
    <div className="w-screen">
      <nav className="max-w-3xl mx-auto px-4 py-3 flex flex-row justify-between">
        <Link to={'/'} className="text-xl">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-[60px]"
            initial={false}>
            <img
              width={60}
              src={'/logo192.png'}
              alt={'Duplicate Character Remover App logo'}
            />
          </motion.div>
        </Link>
        <motion.ul className="flex flex-row gap-1 items-center" layout>
          {routes.map((route) => (
            <motion.li
              key={route.id}
              whileHover={{
                backgroundColor: 'rgb(55, 65, 81)',
                transition: { duration: 0.2 }
              }}
              initial={false}
              animate={{
                backgroundColor:
                  pathName === route.id ? 'rgb(55, 65, 81)' : 'transparent'
              }}
              className={clsx(
                'text-base text-gray-300 px-2 py-1 rounded-sm flex items-center justify-center'
              )}>
              <Link to={route.to}>{route.label}</Link>
            </motion.li>
          ))}
        </motion.ul>
      </nav>
    </div>
  )
}

export default Navbar
