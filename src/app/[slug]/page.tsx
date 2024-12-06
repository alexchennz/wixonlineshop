import Add from '@/components/Add'
import CustomiseProducts from '@/components/CustomiseProducts'
import ProductImages from '@/components/ProductImages'
import React from 'react'
import { wixClientServer } from '@/lib/wixClientServer'
import { notFound } from 'next/navigation'

export default async function SinglePage({params}: {params: {slug: string}}) {
  const wixClient = wixClientServer();

  const products = await wixClient.products.queryProducts().eq("slug", params.slug).find();

  if(!products.items[0]) {
    return notFound()
  }
  const product = products.items[0]

  console.log(product.variants)
  
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product.media?.items}/>
      </div>
      {/* TEXT */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <hr className="border-gray-100 border-t-2" />
        <div className="flex items-center gap-4">
          {product.priceData?.price === product.priceData?.discountedPrice ? (
            <>
            <h3 className='text-xl text-gray-500 line-through'>${product.priceData?.price}</h3>
            <h2 className='text-2xl font-medium'>${product.priceData?.discountedPrice}</h2>
            </>
          ) : (
            <h2 className='text-2xl font-medium'>${product.priceData?.price}</h2>
          ) }
        </div>
        <hr className="border-gray-100 border-t-2" />
        {product.productOptions && product.variants ? <CustomiseProducts productId={product._id!} productOptions={product.productOptions} productVariants={product.variants}/> : 
        <Add productId={product._id!} variantId="00000000-000000-000000-000000000000" stockNumber={product.stock?.quantity || 0}/>
        }
        <hr className="border-gray-100 border-t-2" />
          {product.additionalInfoSections?.map((section: any) => (
            <div className="text-sm" key={section.title}>
              <h4 className="font-medium mb-4">{section.title}</h4>
              {section.description}
            </div>
            
          ))}
      </div>
    </div>
  )
}
