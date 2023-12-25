import { Metadata } from 'next'
import { DEFAULT_METADATA } from '@/utils/metadata'

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  description: '',
}

export default function Tags() {
  return <div>Tags</div>
}
