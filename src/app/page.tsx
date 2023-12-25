import { Metadata } from 'next'
import { DEFAULT_METADATA } from '@/utils/metadata'

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
}

export default function Home() {
  return <div>Home</div>
}
