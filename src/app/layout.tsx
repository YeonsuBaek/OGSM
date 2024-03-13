import type { Metadata } from 'next'
import './index.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'OGSM',
  description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="theme-light daybreak">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
