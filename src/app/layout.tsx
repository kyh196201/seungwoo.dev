import pretendard from './styles/fonts/pretendard'
import '@/app/styles/globals.css'
import Footer from '@/components/footer'
import Header from '@/components/header'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      className="dark"
    >
      <body
        className={`${pretendard.className} flex flex-col py-8 px-4 mx-auto max-w-3xl min-w-[320px] min-h-screen xs:pt-12 xs:px-6`}
      >
        <Header />

        <main className={`flex-1`}>{children}</main>

        <Footer />
      </body>
    </html>
  )
}
