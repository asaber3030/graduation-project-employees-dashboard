import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BarChart2, Users, Calendar, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Real-time Analytics",
    description: "Get instant insights with our powerful analytics tools.",
    icon: BarChart2
  },
  {
    title: "Team Collaboration",
    description: "Seamlessly work together with your colleagues.",
    icon: Users
  },
  {
    title: "Schedule Management",
    description: "Efficiently manage your time and appointments.",
    icon: Calendar
  },
  {
    title: "Customizable Dashboard",
    description: "Tailor your dashboard to fit your specific needs.",
    icon: Settings
  }
]

export default function EmployeeDashboardHero() {
  return (
    <div className='relative overflow-hidden bg-gradient-to-b from-indigo-100 to-white'>
      <div className='absolute inset-0 bg-grid-slate-900/[0.04] bg-[center_top_-1px] dark:bg-grid-slate-400/[0.05] dark:bg-[center_top_-1px] dark:border-t dark:border-slate-100/5' />
      <div className='relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
            Welcome to Your Employee Dashboard
          </h1>
          <p className='mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl'>
            Access powerful tools and insights to boost your productivity and streamline your
            workflow.
          </p>
        </div>

        <div className='mt-16'>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <CardTitle className='flex items-center'>
                    <feature.icon className='h-6 w-6 text-indigo-600 mr-2' />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-gray-500'>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
