import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import Image from 'next/image'
import SearchBar from './SearchBar'
// import NavIcons from './NavIcons'
import dynamic from "next/dynamic";

const NavIcons = dynamic(() => import("./NavIcons"), { ssr: false });

export default function Navbar() {
  return (
    <div className='h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 sticky top-0 z-50 bg-white'>
      {/* MOBILE */}
      <div className="h-full flex justify-between items-center md:hidden">
        <div className="text-2xl tracking-wide">
          <Link href={'/'}>ECOM</Link>
        </div>
        <Menu />
      </div>
      {/* DESKTOP */}
      <div className="hidden md:flex justify-between items-center gap-8 h-full">
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12" >
          <Link href={'/'} className='flex items-center gap-3'>
            <Image src={'/logo.png'} alt='logo' width={24} height={24} />
            <div className="text-2xl tracking-wide">
              ECOM
            </div>
          </Link>
          <div className="hidden xl:flex gap-4">
            <Link href={'/'}>Home</Link>    
            <Link href={'/'}>Shop</Link>    
            <Link href={'/'}>Deals</Link>    
            <Link href={'/'}>About</Link>    
            <Link href={'/'}>Contact</Link> 
          </div>
        </div>
        <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  )
}
