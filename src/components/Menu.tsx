'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Menu() {
    const [open, setOpen] = useState(false)
  return (
    <>
        <Image src={'/menu.png'} alt='menu' width={28} height={28} onClick={() => setOpen((prev)=>!prev)} className="cursor-pointer" />
        {open && (
        <div className="absolute top-20 right-0 bg-black text-white min-w-[200px] w-full h-[calc(100vh-80px)] flex justify-center items-center flex-col gap-8 z-50 *:text-xl">
            <Link href={'/'}>Home</Link>    
            <Link href={'/'}>Shop</Link>    
            <Link href={'/'}>Deals</Link>    
            <Link href={'/'}>About</Link>    
            <Link href={'/'}>Contact</Link>    
            <Link href={'/'}>Logout</Link>    
            <Link href={'/'}>Cart(1)</Link>    
        </div>)}
    </>
  )
}
