import toast from 'react-hot-toast'

export const copyToClip = async (text: string, showToast: boolean = true) => {
  try {
    await navigator.clipboard.writeText(text)
    if (showToast) toast.success('Copied!')
  } catch (e: any) {
    throw new Error('Error copying to clipboard', e)
  }
}
