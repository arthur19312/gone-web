'use client'
import React from 'react'
import '@/styles/globals.scss'
import 'highlight.js/scss/github-dark-dimmed.scss'

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
    </head>
    <body>
    {children}
    </body>
    </html>
  )
}
