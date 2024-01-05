import pretendard from './styles/fonts/pretendard'
import '@/app/styles/globals.css'
import Footer from '@/components/footer'
import Nav from '@/components/nav'
import Link from 'next/link'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.className} flex flex-col pt-14 pb-8 px-4 mx-auto max-w-3xl min-w-[320px] min-h-screen`}
      >
        <header className={`flex items-center justify-between mb-16`}>
          {/* 로고 */}
          <h1>
            <Link href={`/`}>로고</Link>
          </h1>

          <Nav />
        </header>

        <main className={`flex-1`}>{children}</main>

        <Footer />
      </body>
    </html>
  )
}
