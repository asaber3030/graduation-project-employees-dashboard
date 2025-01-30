import "./globals.css"

import React from "react"

import { ReactQueryClientProvider } from "@/providers/react-query"
import { ReduxStoreProvider } from "@/providers/redux"
import { Toaster } from "@/components/ui/sonner"

export const metadata = {
  title: "Techmed",
  description: "Techmed"
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryClientProvider>
      <ReduxStoreProvider>
        <html lang='en'>
          <body>
            {children}
            <Toaster />
          </body>
        </html>
      </ReduxStoreProvider>
    </ReactQueryClientProvider>
  )
}

export default RootLayout
