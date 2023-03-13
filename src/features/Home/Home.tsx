import { ForwardIcon } from 'assets'
import { Button, Input } from 'components'
import React, { FormEvent, useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { hasWhiteSpace } from 'utils'

import RemoveWhiteSpaceModal from './components/RemoveWhiteSpaceModal'

const Home = () => {
  const [stringInput, setStringInput] = useState('')
  const [isRemoveWhiteSpaceModalOpen, setIsRemoveWhiteSpaceModalOpen] =
    useState(false)
  const navigate = useNavigate()

  const handleNavigate = useCallback(
    (path: string) => {
      return navigate(`/${path}`)
    },
    [navigate]
  )

  const handleRemoveDuplicate = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
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
    },
    [handleNavigate, stringInput]
  )

  return (
    <div className="w-full gap-16 flex flex-col mt-36">
      <RemoveWhiteSpaceModal
        setStringInput={setStringInput}
        stringInput={stringInput}
        isOpen={isRemoveWhiteSpaceModalOpen}
        setIsOpen={setIsRemoveWhiteSpaceModalOpen}
        onNext={handleNavigate}
      />
      <h1 className="text-gray-400">
        <span className="text-5xl">
          Say{' '}
          <span className="underline decoration-sky-500 text-gray-200 font-semibold">
            Goodbye
          </span>{' '}
          to Duplicate Characters in Your Text with
        </span>
        <span
          className={
            'text-7xl font-extrabold text-transparent bg-clip-text text-gray-100 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
          }>
          {' '}
          the Duplicate Character Remover...
        </span>
      </h1>
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
            placeholder={'Enter or Paste Your Text Here'}
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
  pageClassName: 'items-center max-w-4xl',
  hideNavbar: true,
  hideFooter: true
}

export default Home
