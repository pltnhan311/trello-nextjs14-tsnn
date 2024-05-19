import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { cn } from '@/lib/utils'
import { Lexend } from 'next/font/google'

const headingFont = Lexend({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

const Logo = () => {
  return (
    <Link href='/'>
      <div className='hover:opacity-75 transition items-center gap-x-2 hidden md:flex'>
        <Image src='/PLogo.svg' alt='Logo' height={30} width={30} className='rounded-full' />
        <p className={cn('text-lg text-neutral-700 pb-1', headingFont.className)}>Taskify</p>
      </div>
    </Link>
  )
}

export default Logo
