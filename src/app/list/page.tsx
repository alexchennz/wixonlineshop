import Filter from '@/components/Filter'
import ProductList from '@/components/ProductList'
import { wixClientServer } from '@/lib/wixClientServer';
import { products } from '@wix/stores';
import Image from 'next/image'
import React, { Suspense } from 'react'

export default async function ListPage({searchParams}: {searchParams: any}) {
  
  const wixClient = wixClientServer();

  const response = await wixClient.collections.getCollectionBySlug(searchParams.cat || 'all-products');

  const collection = response.collection;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* CAMPAIGN */}
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h2 className='text-4xl font-semibold leading-[48px] text-gray-700'>Grab up to 50% off on<br /> Selected Products</h2>
          <button className='rounded-3xl bg-ecom-red text-white w-max py-3 px-5 text-sm'>Shop Now</button>
        </div>
        <div className="relative w-1/3">
          <Image src={collection?.media?.mainMedia?.image?.url || "/woman.png"} alt="{collection.name}" fill className='object-contain' />
        </div>
      </div>
      {/* FILTER */}
      <Filter />
      {/* PRODUCT LIST */}
      <h1 className='mt-12 text-xl font-semibold'>{collection?.name} for You</h1>
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error Async Server Component */}
        <ProductList categoryId={collection?._id || "00000000-000000-000000-000000000001"} limit={8} searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
