'use client'
import { products } from '@wix/stores'
import React, { useEffect, useState } from 'react'
import Add from './Add'

export default function CustomiseProducts({productId, productOptions, productVariants}: {productId: string, productOptions: products.ProductOption[], productVariants: products.Variant[]}) {

  const [selectedOptions, setSelectedOptions] = useState<{[key: string]: string}>({})

  const [selectedVariant, setSelectedVariant] = useState<products.Variant>();

  useEffect(() => {
    const variant = productVariants.find((v) => {
      const variantChoices = v.choices;
      if (!variantChoices) return false;
      return Object.entries(selectedOptions).every(
        ([key, value]) => variantChoices[key] === value
      );
    });
    setSelectedVariant(variant);
  }, [selectedOptions, productVariants]);

  function handleSelectedOption(optionType: string, choice: string) {
    setSelectedOptions(prev => ({...prev, [optionType]: choice}))
  }

  console.log(productVariants)

  function isVariantInStock(choices:{[key: string]: string}) {
    return productVariants.some(variant => {
      const variantChoices = variant.choices
      if(!variantChoices) return false

      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value
        ) && variant.stock?.inStock && (variant.stock.quantity && variant.stock.quantity > 0)
      )
    })
  }

  console.log(selectedOptions)

  return (
    <div className="flex flex-col gap-6">
      {productOptions.map((option) => (
        <div className="flex flex-col gap-4" key={option.name}>
          <h4 className='font-medium'>Choose {option.name}</h4>
          <ul className="flex items-center gap-4">
          {option.choices?.map((choice) => {
            const disabled = !isVariantInStock({...selectedOptions, [option.name!]: choice.description!})

            const selected = selectedOptions[option.name!] === choice.description

            const clickHandle = disabled ? undefined : () => handleSelectedOption(option.name!, choice.description!)

            return (option.name === "Color" ? (
              <li className='w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative' onClick={clickHandle} style={{background: choice.value, cursor: disabled ? 'not-allowed' : 'pointer'}}>
                {selected && <div className="absolute size-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>}
                {disabled && <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>}
              </li>
            ) : (
              <li className={`ring-1 ${disabled ? 'ring-pink-200 text-white bg-pink-200' : 'ring-ecom-red'} ${selected?"text-white bg-ecom-red":"text-ecom-red"} rounded-md py-1 px-4 text-sm ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={clickHandle}>{choice.value}</li>
            ))
          })}
          </ul>
        </div>
      ))}
      {/* <ul className="flex items-center gap-4">
            <li className='w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-red-500'>
              <div className="absolute size-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </li>
            <li className='w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-blue-500'>
            </li>
            <li className='w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-not-allowed relative bg-green-500'>
              <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </li>
          </ul> */}
        {/* <h4 className='font-medium'>Choose size</h4>
        <ul className="flex items-center gap-4">
          <li className='ring-1 ring-ecom-red text-ecom-red rounded-md py-1 px-4 text-sm cursor-pointer'>Small</li>
          <li className='ring-1 ring-ecom-red text-white bg-ecom-red rounded-md py-1 px-4 text-sm cursor-pointer'>Medium</li>
          <li className='ring-1 ring-pink-200 text-white bg-pink-200 rounded-md py-1 px-4 text-sm cursor-not-allowed'>Large</li>
        </ul> */}
        <Add productId={productId} variantId={selectedVariant?._id || "00000000-000000-000000-000000000000"} stockNumber={selectedVariant?.stock?.quantity || 0}/>
    </div>
  )
}
