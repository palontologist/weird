import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'frontforumfocus',
  description: 'Connecting individuals and organizations for a sustainable future',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <nav className="px-10 pt-5">
          <Link href="/"className='text=2xl font-semifold'>
           frontforumfocus <span className='text-teal-500'> F3</span>
          </Link>
        </nav>
        {children}</body>
    </html>
    </ClerkProvider>
  )
}
