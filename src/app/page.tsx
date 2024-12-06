// 'use client'
import CategoryList from "@/components/CategoryList"
import ProductList from "@/components/ProductList"
import Slider from "@/components/Slider"
import { useWixClient } from "@/hooks/useWixClient"
import { wixClientServer } from "@/lib/wixClientServer"
import { Suspense, useEffect } from "react"

const HomePage = async () => {
  // const wixClient = useWixClient();

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const productList = await wixClient.products.queryProducts().find();
  //     console.log('My Products:');
  //     console.log('Total: ', productList.items.length);
  //     console.log(productList.items
  //       .map((item) => item.name)
  //       .join('\n')
  //     );
  //   }

  //   getProducts();
  // }, [])

  
  
  return (
    <div className=''>
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h2 className="text-2xl">Featured Products</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList categoryId={process.env.WIX_FEATURE_PRODUCT_CATEGORY_ID!} limit={4}/>
        </Suspense>
      </div>
      <div className="mt-24">
        <h2 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">Categories</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <CategoryList />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h2 className="text-2xl">New Products</h2>
        {/* <Suspense fallback={<div>Loading...</div>}>
          <ProductList />
        </Suspense> */}
      </div>
    </div>
  )
}

export default HomePage