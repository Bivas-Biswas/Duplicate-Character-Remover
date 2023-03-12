import { ForwardIcon } from 'assets'
import { Button, Input } from 'components'
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { hasWhiteSpace } from 'utils'

import RemoveWhiteSpaceModal from './components/RemoveWhiteSpaceModal'

const Home = () => {
  const [stringInput, setStringInput] = useState('')
  const [isRemoveWhiteSpaceModalOpen, setIsRemoveWhiteSpaceModalOpen] =
    useState(false)
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    return navigate(`/remove-duplicates/${path}`)
  }

  const handleRemoveDuplicate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!stringInput)
      return toast(`can't process empty string`, {
        icon: '😔',
        className: 'bg-indigo-800 rounded text-secondary'
      })
    if (stringInput.trim().length === 0)
      return toast(`can't process white space only.`, {
        icon: '😮‍💨',
        className: 'bg-indigo-800 rounded text-secondary'
      })

    if (hasWhiteSpace(stringInput)) {
      setIsRemoveWhiteSpaceModalOpen(true)
      return
    }

    handleNavigate(stringInput)
  }

  return (
    <div className="w-max gap-16 flex flex-col">
      <RemoveWhiteSpaceModal
        setStringInput={setStringInput}
        stringInput={stringInput}
        isOpen={isRemoveWhiteSpaceModalOpen}
        setIsOpen={setIsRemoveWhiteSpaceModalOpen}
        onNext={handleNavigate}
      />
      <div
        className={
          'text-7xl font-extrabold text-transparent bg-clip-text text-gray-100 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center'
        }>
        <p>Duplicate Character</p>
        <p>Remover</p>
      </div>
      <div className={'flex flex-col items-center gap-6'}>
        <form
          onSubmit={handleRemoveDuplicate}
          className="flex flex-col items-start gap-10 w-full">
          <Input
            hideLabel
            autoComplete="off"
            roundness={'none'}
            className={'text-3xl'}
            type="text"
            placeholder={'Enter string, example "aabbcce"'}
            value={stringInput}
            onChange={(e) => setStringInput(e.target.value)}
            label={'Enter the String'}
            id={'input-string'}
          />
          <div className={'flex flex-row gap-2 items-center'}>
            <Button
              type={'submit'}
              rounded={'none'}
              className={'font-extrabold gap-1'}>
              Next <ForwardIcon className={'w-4 h-4'} />
            </Button>
            <p className={'text-sm'}>
              press <b>Enter</b> ↵
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

Home.layout = {
  pageClassName: 'items-center justify-center',
  hideNavbar: true,
  hideFooter: true
}

export default Home
