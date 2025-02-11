'use client'

import { useEffect } from 'react'

type Props = {
  slug: string
}

export default function ViewReporter({ slug }: Props) {
  useEffect(() => {
    fetch('/api/view-count', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug }),
    })
  }, [slug])

  return null
}
