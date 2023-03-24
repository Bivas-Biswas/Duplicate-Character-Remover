import { Button } from 'components'
import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <div className={'flex-1 flex flex-col items-center mt-20 gap-3'}>
      <h1 className="text-8xl sm:text-9xl text-center">Oops</h1>
      <p className="text-xl text-center">
        The Page you&apos;re looking for isn&apos;t here.
      </p>
      <Link to={'/'}>
        <Button rounded={'none'}>Go Back Home</Button>
      </Link>
    </div>
  )
}

export default Page404
