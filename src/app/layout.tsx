import pretendard from './styles/fonts/pretendard'
import '@/app/styles/globals.css'
import Nav from '@/components/nav'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <header className={``}>
          <Nav />
        </header>

        <main>{children}</main>
      </body>
    </html>
  )
}
