import './globals.css'
import type { Metadata } from 'next'
import {  Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'] , weight: "400"})

export const metadata: Metadata = {
  title: 'PayGuardian - Finances Saver',
  description: 'Guarding Your Expenses, Ensuring Your Future',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
        </body>
    </html>
  )
}
