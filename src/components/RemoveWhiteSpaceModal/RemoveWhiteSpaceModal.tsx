import { CrossIcon, ForwardIcon, TrashIcon } from 'assets'
import clsx from 'clsx'
import { Button, Modal } from 'components/index'
import React, { useCallback, useMemo } from 'react'

type StringWithWhiteSpaceModalProps = {
  isOpen: boolean
  stringInput: string
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
  setStringInput: React.Dispatch<React.SetStateAction<string>>
  onNext?: (_path: string) => void
  showCloseBtn?: boolean
}
const RemoveWhiteSpaceModal = ({
  isOpen,
  stringInput,
  setIsOpen,
  setStringInput,
  onNext,
  showCloseBtn = true
}: StringWithWhiteSpaceModalProps) => {
  const stringArray = stringInput.split('')

  const totalSpaces = useMemo(() => {
    let count = 0
    stringArray.forEach((char) => {
      if (char === ' ') count++
    })
    return count
  }, [stringArray])

  const haveSpaces = totalSpaces === 0

  const handleRemoveSpaces = useCallback(() => {
    const newString = stringArray.filter((char) => char !== ' ').join('')
    setStringInput(newString)
  }, [setStringInput, stringArray])

  const handleNext = useCallback(() => {
    onNext && onNext(stringInput)
  }, [onNext, stringInput])

  return (
    <Modal
      isOpen={isOpen}
      className={'sm:w-1/2 px-8 py-10 relative flex flex-col gap-10'}>
      {showCloseBtn && (
        <button
          className="absolute p-2 right-1 top-1 hover:text-indigo-500"
          onClick={() => setIsOpen && setIsOpen(false)}>
          <CrossIcon />
        </button>
      )}
      <div className={''}>
        <div className="text-xl sm:text-3xl text-center">
          {!haveSpaces ? (
            <h1>
              🧐 <b>{totalSpaces}</b> White Space Found{' '}
            </h1>
          ) : (
            <h1> 🥹 Everthing looks okay</h1>
          )}
        </div>
      </div>
      <CharCardsWrapper>
        {stringArray.map((char, idx) => {
          return <CharCard key={idx} char={char} />
        })}
      </CharCardsWrapper>
      <div className="flex justify-center w-full">
        {!haveSpaces ? (
          <Button
            rounded={'none'}
            onClick={handleRemoveSpaces}
            className={'gap-1 items-center justify-center'}>
            Remove {totalSpaces > 1 ? 'Spaces' : 'Space'}{' '}
            <TrashIcon className={'w-4 h-4'} />
          </Button>
        ) : (
          <Button
            type={'submit'}
            rounded={'none'}
            onClick={handleNext}
            className={'font-extrabold gap-1'}>
            Next <ForwardIcon className={'w-4 h-4'} />
          </Button>
        )}
      </div>
    </Modal>
  )
}

export default RemoveWhiteSpaceModal

const CharCardsWrapper = ({
  children,
  className
}: {
  className?: string
  children: React.ReactNode | React.ReactNode[]
}) => {
  return (
    <div className={clsx('flex flex-wrap gap-1 justify-center', className)}>
      {children}
    </div>
  )
}

const CharCard = ({ char }: { char: string }) => {
  return (
    <p
      className={clsx(
        'w-8 h-8 flex items-center justify-center rounded',
        char === ' '
          ? 'bg-red-400'
          : 'bg-green-100 text-green-600 font-semibold'
      )}>
      {char}
    </p>
  )
}
