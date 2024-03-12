'use client'

import { useCallback, useState } from 'react'
import { CopyIcon, CheckIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { cn } from '@/utils'

type Props = {
  code: string
}

function CopyButton({ code }: Props) {
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
        `absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-md bg-transparent transition-colors`,
        isDark ? 'hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-200 focus:bg-gray-200'
      )}
      onClick={handleClick}
    >
      {isCopied ? <CheckIcon /> : <CopyIcon />}
    </button>
  )
}

export default CopyButton
