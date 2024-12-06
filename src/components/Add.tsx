'use client'
import React, { useState } from 'react'

export default function Add({productId, variantId, stockNumber}: {productId: string, variantId: string, stockNumber: number}) {
  const [quantity, setQuantity] = useState(1)
  function handleQuantity(action: "add" | "subtract") {
    if (action === "add") {
      if(quantity >= stockNumber) return
      setQuantity(quantity + 1)
    } else {
      if(quantity <= 1) return
      setQuantity(quantity - 1)
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className='bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32'>
            <button className='cursor-pointer text-xl' onClick={() => handleQuantity("subtract")}>-</button>
            {quantity}
            <button className='cursor-pointer text-xl' onClick={() => handleQuantity("add")}>+</button>
          </div>
          {stockNumber < 1 ? <div className="text-xs text-gray-500">Out of stock</div> : <div className="text-xs">Only <span className='text-orange-500'>{stockNumber} items</span><br/>left. {"Don't"} miss it!</div>}
        </div>
        <button
            className="w-36 text-sm rounded-3xl ring-1 ring-ecom-red text-ecom-red py-2 px-4 hover:bg-ecom-red hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
          >
            Add to Cart
          </button>
      </div>
    </div>
  )
}
