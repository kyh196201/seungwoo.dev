'use client'

import { Button } from '@/components/ui/button'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const updateVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    updateVisibility()

    window.addEventListener('scroll', updateVisibility)

    return () => {
      window.removeEventListener('scroll', updateVisibility)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <Button
          size={'icon'}
          variant={'outline'}
          className={`fixed bottom-4 right-4 z-10`}
          onClick={scrollToTop}
          asChild
        >
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25 }}
          >
            <ArrowUpIcon />
            <span className={`sr-only`}>페이지 최상단으로 이동</span>
          </motion.button>
        </Button>
      )}
    </AnimatePresence>
  )
}

export default TopButton
