"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import logo from "@/public/images/logo.png";
import profile from "@/public/images/profile.png";
import video from "@/public/images/videoUp.png";
import coin from "@/public/images/coin.png";
import { Menu, MenuIcon } from "lucide-react";
import { useConnect } from "@/context/ConnectContext";
import getAsset from "@/utils/functions/getAssets";

function Nav() {
  const {connect, disconnect, publicKey} = useConnect();
  const [isConnected, setIsConnected] = useState(false);
  const [diamPublicKey, setDiamPublicKey] = useState<string | null>(null);

  // Function to connect to Diam Wallet
  const connectWalletDiam = async () => {
    if (typeof (window as any).diam !== "undefined") {
      try {
        console.log("Attempting to connect to Diam Wallet...");
        const result = await (window as any).diam.connect();

        console.log("Connect result:", result);

        // Extract the public key from the result
        const diamPublicKey = result?.message?.data?.[0];
        console.log("Diam PublicKey:", diamPublicKey);
        connect(diamPublicKey.diamPublicKey);
        if (diamPublicKey && diamPublicKey.diamPublicKey) {
          console.log(`Public key: ${diamPublicKey.diamPublicKey}`);
          // setDiamPublicKey(diamPublicKey.diamPublicKey);
          setIsConnected(true);


          console.log((window as any).diam);
  
  
        } else {
          console.error("Diam PublicKey not found.");
        }
      } catch (error) {
        console.error("Error connecting to Diam Wallet:", error);
        setIsConnected(false);
      }
    } else {
      console.error("Diam Wallet not found.");
      setIsConnected(false);
    }
  };


  const disconnectWallet = async () => {
    const result = await (window as any).diam.disconnect();
    disconnect();
    setIsConnected(false);
  }

  useEffect(() => {
    if (publicKey) {
      console.log("Public key from context:", publicKey);
      setDiamPublicKey(publicKey);
      setIsConnected(true);
    }
  }, [publicKey]);

  return (
    <div>
      <div className="mx-[2vw] mb-[8vw] md:mb-0 pt-[4vw] flex items-center space-x-[4vw] justify-between">
        <div className="flex space-x-[1vw] cursor-pointer items-center">
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-white text-center">
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border border-cyan-400 rounded-[2vw]">
                <Link href="/">
                  <DropdownMenuItem className="text-white">Home</DropdownMenuItem>
                </Link>
                <Link href="Marketplace">
                  <DropdownMenuItem className="text-white">
                    Marketplace
                  </DropdownMenuItem>
                </Link>
                <Link href="AnalyticsPage">
                  <DropdownMenuItem className="text-white">
                    Analytics
                  </DropdownMenuItem>
                </Link>
                <Link href="">
                  <DropdownMenuItem className="text-white">
                    Subscriptions
                  </DropdownMenuItem>
                </Link>
                <Link href="">
                  <DropdownMenuItem className="text-white">
                    Whitepaper
                  </DropdownMenuItem>
                </Link>
                <Link href="">
                  <DropdownMenuItem className="text-white">
                    Contact us
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Link href="/VideoPage">
            <Image src={logo} className="w-[15vw] md:w-[10vw]" alt="" />
          </Link>
        </div>

        <div className="w-full hidden xl:block lg:block md:block">
          <div className="w-full flex h-[2.5vw] items-center bg-transparent justify-between border border-cyan-400 rounded-[0.5vw] relative">
            <input
              className="w-full text-[1vw] text-white bg-transparent focus:outline-none rounded-[1vw] px-[1vw] py-1"
              type="text"
              placeholder="Search.."
            />
            <button className="px-[1vw]">
              <svg
                className="w-[1.5vw] h-[1vw] text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex space-x-[3vw]">
          <div className="flex items-center space-x-2">
            <Image
              src={video}
              className="w-[7vw] sm:w-[4vw] md:hidden"
              alt=""
            />

            <Image
            onClick={getAsset}
              src={coin}
              className="w-[7vw] sm:w-[4vw]"
              alt=""
            />

            <div className="relative">
              <p className="text-white press-start-2p-text text-[4vw] md:text-[1.5vw]">
                120
              </p>
            </div>
          </div>

          <div className="block md:hidden">
            <Image
              className="w-[6vw] h-[6vw] rounded-full"
              src={profile}
              alt="profile"
            />
          </div>
          {isConnected ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="text-white text-center">
                <div className="hidden lg:block xl:block md:block p-[0.1vw] rounded-[0.5vw] bg-gradient-to-tl from-cyan-400 to-black m-2">
                  <div className="flex bg-black rounded-[0.5vw] w-[10vw] h-[2.5vw] space-x-[1vw] items-center">
                    <Image
                      className="w-[2vw] rounded-full"
                      src={profile}
                      alt="profile"
                    />
                    <p className="text-[0.7vw] text-white">
                    {publicKey && diamPublicKey && typeof diamPublicKey === "string" 
                    ? publicKey?.slice(0, 3) + "..." + publicKey?.slice(-3) 
                    : "User"}
                    </p>
                    <MenuIcon className="text-white w-[1vw] h-[1vw] cursor-pointer hover:bg-[#33c2ee50] rounded-[0.2vw]" />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border border-cyan-400 rounded-[2vw]">
                <Link href="/ProfilePage">
                  <DropdownMenuItem className="text-white cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                </Link>
                <Link href="/StudioPage">
                  <DropdownMenuItem className="text-white cursor-pointer">
                    Creator Studio
                  </DropdownMenuItem>
                </Link>
                  <DropdownMenuItem className="text-white cursor-pointer" onClick={disconnectWallet}>
                    Disconnect Wallet
                  </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="bg-white rounded-full h-[7vw] sm:h-[5vw] md:h-[3vw] flex justify-center items-center">
              <Button
                className="rounded-full px-[1vw] py-0 text-center md:rounded-[2vw] text-[3vw] sm:text-[2vw] md:text-[1vw]"
                variant="secondary"
                onClick={connectWalletDiam}
              >
                Connect Wallet
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;