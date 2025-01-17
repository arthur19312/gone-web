import React from 'react'
import '@/styles/globals.scss'
import 'highlight.js/scss/github-dark-dimmed.scss'
import Script from 'next/script'
import { cn } from '@/lib/utils'
import { Inter as FontSans } from 'next/font/google'
import localFont from 'next/font/local'
import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading'
})

export const metadata: Metadata = {
  title: {
    default: 'lyp123',
    template: '%s - lyp123'
  }
}

export default function RootLayout ({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"/>
      <title></title>
      <meta name="theme-color" content="#ffffff"/>
      <script
        dangerouslySetInnerHTML={{
          __html: `
                try {
                  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark')
                    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#161b22')
                  } else {
                    document.documentElement.classList.remove('dark')
                  }
                } catch (_) {}
              `
        }}
      />
      <Script src="/lib/l2d.js" strategy="beforeInteractive"/>
    </head>
    <body className={cn(
      'min-h-screen bg-background font-sans antialiased',
      fontSans.variable,
      fontHeading.variable
    )}>
    {children}
    <Toaster />
    </body>
    </html>
  )
}
