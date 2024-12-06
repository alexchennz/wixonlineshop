import { wixClientServer } from '@/lib/wixClientServer';
import { products } from '@wix/stores';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Pagination from './Pagination';
// import { DOMPurify } from 'isomorphic-dompurify';

const PRODUCT_PER_PAGE = 20

export default async function ProductList({categoryId, limit, searchParams}: {categoryId: string, limit?: number, searchParams: any}) {
    const wixClient = await wixClientServer();

    const productQuery = wixClient.products
        .queryProducts()
        .startsWith('name', searchParams?.name || '')
        .eq("collectionIds", categoryId)
        .hasSome('productType',searchParams?.type ? [searchParams.type] : ["physical", "digital"])
        .gt('priceData.price', searchParams?.min || 0)
        .lt('priceData.price', searchParams?.max || 9999999)
        .limit(limit || PRODUCT_PER_PAGE)
        .skip(searchParams?.page ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE) : 0)
        //.find();

    // if(searchParams?.sort){ // The wix sorting is not working, it is wix's problem
    //     const [sortType, sortBy] = searchParams.sort.split(' ');
    //     if(sortType === 'asc'){
    //         productQuery.ascending(sortBy);
    //     }
    //     if(sortType === 'desc'){
    //         productQuery.descending(sortBy);
    //     }
    // }

    const productList = await productQuery.find();
    
    // const products = productList.items

    // if(searchParams?.sort){ 
    //     const [sortType, sortBy] = searchParams.sort.split(' ');
    //     if(sortType === 'asc'){
    //         products.sort((a: any, b: any) => a[sortBy] - b[sortBy])
    //     }
    //     if(sortType === 'desc'){
    //         products.sort((a: any, b: any) => b[sortBy] - a[sortBy])
    //     }
    // }


        // console.log("categoryId",categoryId);
        // console.log("limit",limit);
        // console.log("searchParams",searchParams);
        // console.log("totalCount",productList.totalCount);
        // console.log(productList.items);

  return (
    <div className="mt-12">
        <div className="flex flex-wrap gap-x-8 gap-y-16 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {productList.items.map((product:products.Product) => (
                <Link href={`/${product.slug}`} className="w-full flex flex-col gap-4" id={product._id}>
            
                    <div className="relative w-full h-80">
                        <Image src={product.media?.mainMedia?.image?.url || 'product.png'} sizes='25vw' fill alt='' className='absolute rounded-md object-cover z-10 hover:opacity-0 ease transition-opacity duration-500'/>
                        {product?.media?.items && <Image src={product?.media?.items[1]?.image?.url|| 'product.png'} sizes='25vw' fill alt=''  className='absolute rounded-md object-cover' />}
                    </div>
                    <div className="flex justify-between">
                        <div className="font-medium">{product.name}</div>
                        <div className="font-semibold">${product.priceData?.price}</div>
                    </div>
                    {product.additionalInfoSections && (
                        <div className="text-sm text-gray-500">{product.additionalInfoSections.find(
                            (section: any) => section.title === "shortDesc"
                        )?.description || ""}</div>
                    )}
                    <button className="rounded-2xl ring-1 w-max ring-ecom-red text-ecom-red px-4 py-2 text-xs hover:bg-ecom-red hover:text-white">Add to Cart</button>
                </Link>
            ))}
        </div>

        <Pagination currentPage={productList.currentPage || 0} hasPrev={productList.hasPrev()} hasNext={productList.hasNext()}   />
    </div>
  )
}
