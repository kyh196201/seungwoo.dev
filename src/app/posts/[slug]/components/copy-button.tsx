'use client'

import { useCallback, useState } from 'react'
import { CopyIcon, CheckIcon } from '@radix-ui/react-icons'
import { cn } from '@/utils'

type Props = {
  code: string
}

const CopyButton = ({ code }: Props) => {
  const [isCopied, setIsCopied] = useState(false)
  // TODO: use dark mode
  const isDark = true
  const iconColor = isDark ? '#ffffff' : '#141414' // --background

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
      className={cn(
        `absolute w-8 h-8 flex items-center justify-center bottom-2 right-2 transition-colors bg-transparent rounded-md`,
        isDark ? 'hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-200 focus:bg-gray-200'
      )}
      onClick={handleClick}
    >
      {isCopied ? <CheckIcon color={iconColor} /> : <CopyIcon color={iconColor} />}
    </button>
  )
}

export default CopyButton
