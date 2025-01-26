import React, { useEffect, useState } from 'react';
import thumbnail from '@/public/images/thumbnail.png'
import { Button } from './button';
import Link from 'next/link'
import getAllAssets from '@/utils/functions/getAllAssets'

const Market = () => {


  const [assets, setAssets] = useState<any>([])
  const rewards = [
    { id: 1, creator: '@Andy William' , title: 'Basic how to get into web 2 ecosystem', cost: '0.8 ETH' , thumbnail },
    { id: 2, creator: '@Andy William' , title: 'Basic how to get into web 2 ecosystem', cost: '0.8 ETH' , thumbnail },
    { id: 3, creator: '@Andy William' , title: 'Basic how to get into web 2 ecosystem', cost: '0.8 ETH' , thumbnail },
    { id: 4, creator: '@Andy William' , title: 'Basic how to get into web 2 ecosystem', cost: '0.8 ETH' , thumbnail },
    { id: 5, creator: '@Andy William' , title: 'Basic how to get into web 2 ecosystem', cost: '0.8 ETH' , thumbnail },
    { id: 6, creator: '@Andy William' , title: 'Basic how to get into web 2 ecosystem', cost: '0.8 ETH' , thumbnail },
    { id: 7, creator: '@Andy William' , title: 'Basic how to get into web 2 ecosystem', cost: '0.8 ETH' , thumbnail },
    { id: 8, creator: '@Andy William' , title: 'Basic how to get into web 2 ecosystem', cost: '0.8 ETH' , thumbnail },
    { id: 9, creator: '@Andy William' , title: 'Basic how to get into web 2 ecosystem', cost: '0.8 ETH' , thumbnail },
    { id: 10, creator: '@Andy William' , title: 'Basic how to get into web 2 ecosystem', cost: '0.8 ETH' , thumbnail },

  ];

  useEffect(() => {
    (async () => {

      const result = getAllAssets();
      const Assets = await result;
      setAssets(Assets);
      


      
    })(); // Notice the immediate invocation here
  }, []);

  return (
    <div className="  md:w-[90%] pb-[1vw] h-full">
      <div className="grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {assets.map((asset: any, index:number) => (
          <Link href={{pathname:'/NftPage', query: {thumbnail: asset.thumbnail, price: asset[1], video: asset.videoCid, amount: asset.amount}}} key={index}>
            <div className='bg-gradient-to-br from-cyan-400  via-[#ad9f9f00] to-cyan-400 p-[0.1vw] rounded-[0.5vw]' >
                <div className="bg-[#151414] h-full text-white rounded-[0.5vw] overflow-hidden">
                  <div className=  "w-full relative " >
                    {/* <Link href='/NftPage'> */}
                  <img src={`https://gateway.lighthouse.storage/ipfs/${asset.thumbnail}`}  alt={'thumbnails'} className="w-full h-full p-[1vw]" />
                  {/* </Link> */}
                  </div>
                    <div className="p-[1vw]">
                    {/* <Link href='/NftPage'> */}
                        <p className="  text-[4vw] md:text-[1vw]  font-semibold mb-2">{asset[0]}</p>
                        {/* </Link> */}
                        <div className='flex text-center items-center justify-between text-[2vw] md:text-[0.8vw] text-[#808191] space-x-[0.5vw]' >
                            {/* <p className='text-[3vw] md:text-[1vw] lg:text-[0.8vw] ' >{rewards[0].creator}</p> */}
                            
                            <p className=' text-[3vw] md:text-[1.5vw] font-semibold bg-gradient-to-r inline-block text-transparent bg-clip-text from-[#33C1EE] via-[#8DDCF5]  to-[#FFFFFF] ' >{asset[1]} {" "} wei</p>
                        </div>

                    </div>
                </div>
            </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default Market;
