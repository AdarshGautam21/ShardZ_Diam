"use client";
import React, {useState, useEffect} from 'react';
import "@/app/globals.css";
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import video from '@/public/images/videoUp.png';
import coin from '@/public/images/coin.png';
import logo from '@/public/images/logo.png'
import Home1 from '@/public/images/home1.png'
import subscription from '@/public/images/subscriptions.png'
import analytics from '@/public/images/chart.png'
import downloads from '@/public/images/downloads.png'
import video2 from '@/public/images/videos2.png'
import HomeIcon from '@/public/images/Home.png';
import ArrowRightIcon from '@/public/images/Arrow - Right.png';
import Sidemenu from '@/components/main/Sidemenu'
import Nav from '@/components/main/Nav'
import ellipse from '@/public/images/EllipseHome.png';
import { Menu, MenuIcon, Video } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import Market from '../components/ui/marketplace';
import { ethers } from 'ethers';
import contractABI from '@/public/abi/createNft.json'


function MarketPlace() {
    const settings = {
        arrows: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 4.5,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 4.5,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const settings2 = {
        arrows: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1
                }
            }
        ]
    };


    const [signer, setSigner] = useState<any>('')
  const [contract, setContract] = useState<any>('')

  const transactionList: any[] = [];

  

    return (
        <div className='bg-[#0D0D0E]' style={{
            backgroundImage: `url(${ellipse.src})`,
            width: '100%',
            height: '100%',
            backgroundSize: "cover",
            backgroundRepeat: 'no-repeat',
        }}>

            <Nav />
            
            <div className='block md:hidden mx-[2vw]'>
                <div className='w-full flex h-[8vw] rounded-[2vw] items-center bg-transparent justify-between border border-cyan-400 md:rounded-[0.5vw] relative'>
                    <input className='w-full text-[3vw] sm:text-[2.5vw] md:text-[1vw] text-white bg-transparent focus:outline-none md:rounded-[1vw] px-[2vw] md:px-[1vw] py-1'
                        type='text'
                        placeholder='Search..'
                    />
                    <button className='px-[1vw]'>
                        <svg
                            className="w-[3vw] h-[3vw] md:w-[1.5vw] md:h-[1vw] text-gray-500"
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
            <div className='flex justify-between mt-[2vw] h-[100vh]'>
            

            <Sidemenu />
                <div className='w-[95%] mx-[2vw] md:w-4/5 md:mx-auto space-y-[1vw]'>
                    <div>
                        <h2 className='text-white text-[5vw] md:text-[2vw] cursor-pointer font-semibold'>Explore Marketplace</h2>
                    </div>
                    
                    <Market/>
                </div>
            </div>
        </div>
    );
}

export default MarketPlace;
