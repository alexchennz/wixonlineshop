'use client'

import { useContext } from "react"
import { WixContext } from "@/context/wixContext"

export const useWixClient = () => {
    return useContext(WixContext);
}