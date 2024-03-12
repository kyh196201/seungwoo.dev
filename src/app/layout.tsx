import pretendard from './styles/fonts/pretendard'
import '@/app/styles/globals.css'
import Footer from '@/components/footer'
import Header from '@/components/header'
import ThemeProvider from '@/components/theme-provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.className} mx-auto flex min-h-screen min-w-[320px] max-w-3xl flex-col px-4 pb-8 xs:px-6 xs:pb-12`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <>
            <Header />

            <main className="flex-1 pt-16">{children}</main>

            <Footer />
          </>
        </ThemeProvider>
      </body>
    </html>
  )
}
