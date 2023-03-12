import { CrossIcon, ForwardIcon, TrashIcon } from 'assets'
import clsx from 'clsx'
import { Button, Modal } from 'components'
import React, { useMemo } from 'react'

type StringWithWhiteSpaceModalProps = {
  isOpen: boolean
  stringInput: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setStringInput: React.Dispatch<React.SetStateAction<string>>
  onNext?: (_path: string) => void
}
const RemoveWhiteSpaceModal = ({
  isOpen,
  stringInput,
  setIsOpen,
  setStringInput,
  onNext
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

  const handleRemoveSpaces = () => {
    const newString = stringArray.filter((char) => char !== ' ').join('')
    setStringInput(newString)
  }

  const handleNext = () => {
    onNext && onNext(stringInput)
  }

  return (
    <Modal
      isOpen={isOpen}
      className={'w-4/5 p-6 relative flex flex-col gap-10'}>
      <Button
        variant={'transparent'}
        className="absolute right-3 top-3"
        onClick={() => setIsOpen(false)}>
        <CrossIcon />
      </Button>
      <div className={''}>
        <div className="text-3xl">
          {!haveSpaces ? (
            <h1>
              🧐 <b>{totalSpaces}</b> White Space Found in the String{' '}
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
      <div className="flex justify-end w-full">
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
