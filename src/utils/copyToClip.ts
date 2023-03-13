import toast from 'react-hot-toast'

export const copyToClip = async (text: string, showToast: boolean = true) => {
  try {
    await navigator.clipboard.writeText(text)
    if (showToast) toast.success('Copied!')
  } catch (e) {
    console.error('Error copying to clipboard', e)
  }
}
