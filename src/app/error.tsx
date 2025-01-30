"use client"

import Link from "next/link"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error({ error })
  }, [error])

  return (
    <div>
      <div className='flex flex-col items-center justify-center min-h-screen bg-background'>
        <div className='text-center space-y-6 p-6 max-w-md'>
          <AlertCircle className='mx-auto h-16 w-16 text-destructive' />
          <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
            Oops! Something went wrong
          </h1>
          <p className='text-muted-foreground'>
            We encountered an error while fetching products. Please try again later or return to the
            home page.
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <Button onClick={() => reset()} variant='outline'>
              Try again
            </Button>
            <Button asChild>
              <Link href='/'>Go to Home Page</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
