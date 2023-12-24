'use client'

import { useCallback, useState } from 'react'
import { CopyIcon, CheckIcon } from '@radix-ui/react-icons'

const CopyButton: React.FC<{ code: string }> = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleClick = useCallback(async () => {
    // copy code text
    await navigator.clipboard.writeText(code)

    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 3000)
  }, [code])

  return (
    <button
      type="button"
      className={`absolute w-8 h-8 flex items-center justify-center bottom-2 right-2 transition-colors text-black bg-transparent rounded-md hover:bg-gray-200`}
      onClick={handleClick}
    >
      {isCopied ? <CheckIcon /> : <CopyIcon />}
    </button>
  )
}

export default CopyButton
