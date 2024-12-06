'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export default function Filter() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const {replace} = useRouter()

    function handleFilterChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
        const {name, value} = e.target
        const params = new URLSearchParams(searchParams)
        params.set(name, value)
        console.log(params.toString())
        replace(`${pathname}?${params.toString()}`)
    }

  return (
    <div className="mt-12 flex justify-between">
        <div className="flex gap-6 flex-wrap">
            <select name="type" id="" className='py-2 px-4 rounded-2xl text-sx font-medium bg-[#EBEDED]' onChange={handleFilterChange}>
                <option value="">Type</option>
                <option value="physical">Physical</option>
                <option value="digital">Digital</option>
            </select>
            <input type="text" name='min' placeholder='min price' className='text-sx rounded-2xl pl-2 w-24 ring-1 ring-gray-400' onChange={handleFilterChange} />
            <input type="text" name='max' placeholder='max price' className='text-sx rounded-2xl pl-2 w-24 ring-1 ring-gray-400' onChange={handleFilterChange} />
            {/* <select name="size" id="" className='py-2 px-4 rounded-2xl text-sx font-medium bg-[#EBEDED]' onChange={handleFilterChange}>
                <option value="">Size</option>
            </select>
            <select name="color" id="" className='py-2 px-4 rounded-2xl text-sx font-medium bg-[#EBEDED]' onChange={handleFilterChange}>
                <option value="">Color</option>
            </select> */}

            <select
            name="cat"
            className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
            onChange={handleFilterChange}
            >
            <option>Category</option>
            <option value="">New Arrival</option>
            <option value="">Popular</option>
            </select>
            <select
            name=""
            id=""
            className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
            onChange={handleFilterChange}
            >
            <option>All Filters</option>
            </select>
        </div>
        <div className="">
            <select
            name="sort"
            id=""
            className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
            onChange={handleFilterChange}
            >
            <option>Sort By</option>
            <option value="asc price">Price (low to high)</option>
            <option value="desc price">Price (high to low)</option>
            <option value="asc lastUpdated">Newest</option>
            <option value="desc lastUpdated">Oldest</option>
            </select>
        </div>
    </div>
  )
}
