'use client';
import Image from "next/image";
import { useState } from "react";


// const images = [
//     {
//         id: 1,
//         url: "https://images.pexels.com/photos/1176618/pexels-photo-1176618.jpeg?auto=compress&cs=tinysrgb&w=600"
//     },
//     {
//         id: 2,
//         url: "https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?auto=compress&cs=tinysrgb&w=600"
//     },
//     {
//         id: 3,
//         url: "https://images.pexels.com/photos/581087/pexels-photo-581087.jpeg?auto=compress&cs=tinysrgb&w=600"
//     },
//     {
//         id: 4,
//         url: "https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg?auto=compress&cs=tinysrgb&w=600"
//     },
    
// ]

export default function ProductImages({items}: {items: any}) {
    const [index, setIndex] = useState(0);
  return (
    <div className="">
        <div className="h-[500px] relative flex flex-col gap-4">
            <Image 
                src={items[index].image.url}
                alt="product"
                fill
                className="object-cover rounded-md"
                sizes="30vw"
            />
        </div>
        <div className="flex justify-between gap-4 mt-8">
            {items.map((item: any, index: number) => (
                <div className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer" onClick={() => setIndex(index)}>
                    <Image
                        key={item._id!}
                        src={item.image.url}
                        alt="product"
                        fill
                        className="object-cover rounded-md"
                        sizes="30vw"
                    />
                </div>
            ))}
        </div>
    </div>
  );
}
