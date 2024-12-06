import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { wixClientServer } from '@/lib/wixClientServer'
import { collections } from '@wix/stores';

export default async function CategoryList() {
    const wixClient = wixClientServer();
    const categories = await wixClient.collections.queryCollections().find();
  return (
    <div className="px-4 overflow-x-auto scroll-hidden">
        <div className="flex gap-4 md:gap-8">
            
            {categories.items.map((category: collections.Collection) => (
                <Link href={`/list?cat=${category.slug}`} key={category._id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6">
                <div className="relative w-full h-96 bg-slate-100">
                    <Image src={category.media?.mainMedia?.image?.url || "/category.png"} alt='category' sizes='25vw' fill className='object-cover' />
                </div>
                <h3 className='mt-8 font-light text-center tracking-wide'>{category.name}</h3>
            </Link>
            ))}
        </div>
    </div>
  )
}
