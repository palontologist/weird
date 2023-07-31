import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { ClerkProvider } from '@clerk/nextjs';
import { Navbar } from "@/components/navbar"; 
import { ThemeProvider} from '@/components/theme-provider'
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
    <div className="h-full">
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
       
        <main className="md:pl-20 dark:bg-black dark:text-gray-100 min-h-screen">
        < Navbar />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        </ThemeProvider>
        </main>
        </body>
    </html>
    </ClerkProvider>
    </div>
    
  )
}
