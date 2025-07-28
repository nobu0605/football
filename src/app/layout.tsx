import type { Metadata } from 'next'
import { Footer } from '@/components/common/Footer'
import { Header } from '@/components/common/Header'
import './globals.css'
import { Flex } from '@/components/ui/Flex'

export const metadata: Metadata = {
  title: 'Football',
  description: 'You can find the football matches here',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Flex $gap='10px' $direction='column'>
          <Header />
          <div style={{ margin: '10px', overflowX: 'auto' }}>{children}</div>
          <Footer />
        </Flex>
      </body>
    </html>
  )
}
