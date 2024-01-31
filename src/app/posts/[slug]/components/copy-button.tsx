'use client'

import { useCallback, useState } from 'react'
import { CopyIcon, CheckIcon } from '@radix-ui/react-icons'
import { cn } from '@/utils'
import { useTheme } from 'next-themes'

type Props = {
  code: string
}

const CopyButton = ({ code }: Props) => {
  const [isCopied, setIsCopied] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

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
      {isCopied ? <CheckIcon /> : <CopyIcon />}
    </button>
  )
}

export default CopyButton
