import { ClipBoardIcon, HomeIcon } from 'assets'
import { Button, Modal } from 'components'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { copyToClip } from 'utils'

export type SuccessModalProps = {
  isOpen: boolean
  originalString: string
  resultantString: string
}

const SuccessModal = ({
  isOpen,
  originalString,
  resultantString
}: SuccessModalProps) => {
  const navigate = useNavigate()

  return (
    <Modal
      isOpen={isOpen}
      className={'sm:w-1/2 px-6 py-6 relative flex flex-col gap-8'}>
      <h3 className={'text-4xl text-center font-semibold'}>
        Duplicates removed! 🥳
      </h3>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <p className="text-lg">Orginal</p>
          <p className="bg-gray-600 w-max px-2 rounded-sm text-lg">
            {originalString}
          </p>
        </div>
        <div>
          <p className="text-lg">Resultant</p>
          <p className="bg-gray-600 w-max px-2 rounded-sm text-lg">
            {resultantString}
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-end gap-4">
        <Button
          variant={'secondary'}
          rounded={'none'}
          onClick={() => navigate('/')}
          className="flex flex-row gap-1 items-center justify-center">
          <HomeIcon className="w-5 h-5" /> Home
        </Button>
        <Button
          rounded={'none'}
          onClick={() => copyToClip(resultantString)}
          className="flex flex-row gap-1 items-center justify-center">
          <ClipBoardIcon className="w-5 h-5" /> Copy
        </Button>
      </div>
    </Modal>
  )
}

export default SuccessModal
