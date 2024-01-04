import { Metadata } from 'next'
import { DEFAULT_METADATA } from '@/utils/metadata'
import PageLayout from '@/components/page-layout'

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
}

export default function Home() {
  return <PageLayout>Home</PageLayout>
}
