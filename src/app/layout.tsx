import pretendard from './styles/fonts/pretendard'
import '@/app/styles/globals.css'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.className} flex flex-col pb-8 px-4 mx-auto max-w-3xl min-w-[320px] min-h-screen xs:pb-12 xs:px-6`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <>
            <Header />

            <main className={`flex-1 pt-16`}>{children}</main>

            <Footer />
          </>
        </ThemeProvider>
      </body>
    </html>
  )
}
