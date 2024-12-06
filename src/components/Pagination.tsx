'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function Pagination({currentPage, hasPrev, hasNext}: {currentPage:number, hasPrev: boolean, hasNext: boolean}) {

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const {replace} = useRouter()

    function createPageUrl(pageNumber: number) {
        const params = new URLSearchParams(searchParams)
        params.set('page', pageNumber.toString())
        const newurl = `${pathname}?${params.toString()}`
        console.log(newurl)
        replace(newurl)
    }

  return (
    <div className="mt-12 flex justify-between w-full">
        <button className="rounded-md bg-ecom-red text-white p-2 text-sm w-24 curor-pointer disabled:cursor-not-allowed disabled:bg-pink-200" disabled={!hasPrev} onClick={() => createPageUrl(currentPage - 1)}>Previous</button>
        <button className="rounded-md bg-ecom-red text-white p-2 text-sm w-24 curor-pointer disabled:cursor-not-allowed disabled:bg-pink-200" disabled={!hasNext} onClick={() => createPageUrl(currentPage + 1)}>Next</button>
    </div>
  )
}
