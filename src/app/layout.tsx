import pretendard from './styles/fonts/pretendard'
import '@/app/styles/globals.css'
import Footer from '@/components/footer'
import Nav from '@/components/nav'
import Link from 'next/link'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.className} flex flex-col py-8 px-4 mx-auto max-w-3xl min-w-[320px] min-h-screen xs:pt-12 xs:px-6`}
      >
        <header className={`flex items-center justify-between mb-16`}>
          {/* 로고 */}
          <h1>
            <Link
              href={`/`}
              className={`flex items-center gap-1 text-2xl font-bold`}
            >
              <span>sam.dev</span>
            </Link>
          </h1>

          <Nav />
        </header>

        <main className={`flex-1`}>{children}</main>

        <Footer />
      </body>
    </html>
  )
}
