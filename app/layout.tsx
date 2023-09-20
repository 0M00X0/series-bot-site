import './globals.css'
import { Providers } from "./providers";
import type { Metadata } from 'next'
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export interface RootLayoutProps {
  children: React.ReactNode
}
export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className='dark'>
      <body>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
