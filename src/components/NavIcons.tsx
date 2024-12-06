"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CartModal from "./CartModal";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";

export default function NavIcons() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // const isLoggedIn = false;
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();
  const handleProfile = () => {
    if (isLoggedIn) {
      setIsProfileOpen((prev) => !prev);
    } else {
      // goes to login page
      // router.push("/login");
      setIsLoginOpen(true)
    }
  };

  const handleLogin = async (option: "wix" | "site") => {
    if(option === "wix"){ // wix returned a 500 error, saying my site is not public
      const loginRequestData = wixClient.auth.generateOAuthData(
        "http://localhost:3000/"
      );
      console.log(loginRequestData);

      localStorage.setItem("oAuthRequestData", JSON.stringify(loginRequestData));

      const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);

      console.log(authUrl);

      window.location.href = authUrl;

    }
    else{
      router.push("/login");
    }
  }

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    setIsProfileOpen(false);
    router.push(logoutUrl);
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src={"/profile.png"}
        alt="profile"
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
      />
      {isLoginOpen && (
        <div className="absolute top-12 left-0 flex justify-center items-center flex-col gap-8 z-20 rounded-md text-sm p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white">
          {/* <div onClick={()=>handleLogin("wix")} className="cursor-pointer">Login with Wix</div> */}
          <div onClick={()=>handleLogin("site")} className="cursor-pointer">Login with site</div>
        </div>
      )}
      {isProfileOpen && (
        <div className="absolute top-12 left-0 flex justify-center items-center flex-col gap-8 z-20 rounded-md text-sm p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white">
          <Link href={"/"}>Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            {isLoading ? "Logging out" : "Logout"}
          </div>
        </div>
      )}
      <Image
        src={"/notification.png"}
        alt="notification"
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div className="relative cursor-pointer" onClick={() => setIsCartOpen((prev) => !prev)}>
        <Image
          src={"/cart.png"}
          alt="cart"
          width={22}
          height={22}
          className="cursor-pointer"
          
        />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-ecom-red rounded-full flex justify-center items-center text-white text-sm">2</div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
}
