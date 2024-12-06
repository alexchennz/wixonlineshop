import { OAuthStrategy, createClient } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { cookies } from "next/headers";

export const wixClientServer = () => {
    let refreshToken;
    try {
        const cookieStore = cookies();
        refreshToken = JSON.parse(
        cookieStore.get("refreshToken")?.value || "{}"
        );
    } catch (e) {}
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
            refreshToken,
        },
        }),
    });

    return wixClient;
};
