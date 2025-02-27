import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'


import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider'


import './globals.css'

const inter = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'frontforumfocus',
  description: 'connecting people working SDGS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn("bg-secondary", inter.className)}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
           
            {children}
            
          </ThemeProvider>
        </body>
      </html>
     </ClerkProvider>
  )
}