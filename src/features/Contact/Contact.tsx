import { GithubIcon, LinkedInIcon, TwitterIcon } from 'assets'
import React from 'react'
import { Link } from 'react-router-dom'

const IconsList = [
  {
    id: 1,
    label: 'github',
    icon: GithubIcon,
    link: 'https://github.com/Bivas-Biswas'
  },
  {
    id: 2,
    label: 'twitter',
    icon: TwitterIcon,
    link: 'https://twitter.com/bivasbiswas99'
  },
  {
    id: 3,
    label: 'linkedin ',
    icon: LinkedInIcon,
    link: 'https://www.linkedin.com/in/bivas-biswas-828a731b7/'
  }
] as const

const Contact = () => {
  return (
    <div className="flex-1 flex flex-col items-center mt-24 text-gray-300 gap-3">
      <p className="text-2xl text-center">
        If you have any query or find any bug
      </p>
      <p className="text-2xl text-center">feel free to contact me</p>

      <div className="flex flex-row gap-3">
        {IconsList.map((item) => (
          <Link
            to={item.link}
            key={item.id}
            target="_blank"
            rel="noreferrer noopener"
            className="transition ease-in-out sm:hover:-translate-y-1 sm:hover:scale-110 duration-300">
            {<item.icon className="w-6 h-6" />}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Contact
