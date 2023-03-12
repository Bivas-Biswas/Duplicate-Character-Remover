import { Button, Input } from 'components'
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { hasWhiteSpace } from 'utils'

const Home = () => {
  const [stringInput, setStringInput] = useState('')
  const navigate = useNavigate()
  const handleRemoveDuplicate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!stringInput) return toast.error('No String Added')
    if (hasWhiteSpace(stringInput))
      return toast.error('White Space Present in the String')

    navigate(`/remove-duplicates/${stringInput}`)
  }

  return (
    <div className={'flex flex-col items-center gap-4'}>
      <form
        onSubmit={handleRemoveDuplicate}
        className="flex flex-col items-center gap-3 mt-10">
        {/* <label>Enter the String</label> */}
        <Input
          className={'border-2'}
          type="text"
          value={stringInput}
          onChange={(e) => setStringInput(e.target.value)}
          label={'Enter the String'}
          id={'input-string'}
        />
        <Button type={'submit'}>Remove</Button>
      </form>
    </div>
  )
}

Home.layout = {
  className: 'bg-gray-800'
}

export default Home
