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
 
   <html lang="en" suppressHydrationWarning>
    <body className={cn("bg-secondary", inter.className)}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </body>
   </html>
  
    
    
  )
}
