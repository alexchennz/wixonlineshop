'use client'

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import Cookies from "js-cookie";
import { createContext, ReactNode } from "react";

const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}");

const wixClient = createClient({
    modules: {
      products,
      collections,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        accessToken: {
          value: "",
          expiresAt: 0,
        },
        refreshToken
      },
    }),
  });

  export type WixContextType = typeof wixClient
  
  export const WixContext = createContext<WixContextType>(wixClient);

  export const WixContextProvider = ({ children }: { children: ReactNode }) => {
    return <WixContext.Provider value={wixClient}>{children}</WixContext.Provider>;
  };