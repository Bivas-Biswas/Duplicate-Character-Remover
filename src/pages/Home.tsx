import { Input } from 'components'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [stringInput, setStringInput] = useState('')
  const navigate = useNavigate()
  const handleRemoveDuplicate = () => {
    if (!stringInput) return
    if (!stringInput.trim()) return

    navigate(`/remove-duplicates/${stringInput}`)
  }

  return (
    <div className={'flex flex-col items-center gap-4'}>
      <form
        onSubmit={handleRemoveDuplicate}
        className="flex flex-col items-center gap-3 mt-10">
        <label>Enter the String</label>
        <Input
          className={'border-2'}
          type="text"
          value={stringInput}
          onChange={(e) => setStringInput(e.target.value)}
          label={'Enter the String'}
          id={'input-string'}
        />
        <button
          type={'submit'}
          className="bg-green-500 px-2 py-1 rounded font-semibold text-gray-100">
          Remove
        </button>
      </form>
    </div>
  )
}

Home.layout = {
  className: 'bg-gray-800'
}

export default Home
