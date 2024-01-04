import { Metadata } from 'next'
import { DEFAULT_METADATA } from '@/utils/metadata'
import PageLayout from '@/components/page-layout'

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  description: '',
}

export default function About() {
  return <PageLayout>About me</PageLayout>
}
