"use client"
import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import "@/app/globals.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Nav from '@/components/main/Nav'
import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod"
import {ethers, Contract, Provider, JsonRpcSigner} from 'ethers';
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { boolean, z } from "zod"
import ellipse from '@/public/images/EllipseHome.png'
import contractABI from '@/public/abi/assetMarket.json';
import { useRouter } from 'next/router';
import {contracts} from '@/utils/config'
import Publish from '@/components/Publish/Publish'
import getAssetAddress from '@/utils/functions/getAddress';
import Mint from '@/components/Publish/Mint'
import getTotalSupply from '@/utils/functions/getTotalSupply';

// import {ethers} from 'ethers'

const formSchema = z.object({
  Title: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }),
  Description: z.string().min(40, {
      message: "Description must be at least 40 characters.",
  }),
  yes: z.boolean(),
  no: z.boolean(),
});



const UploadPage =() => {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [portion, setPortion] = useState<number>(50); // Initial portion value
  const [price, setPrice] = useState<number>(0); // Initial price value
  const [assetAddress, setAssetAddress] = useState<string>('')
  const [totalSupply, setTotalSupply] = useState<any>(0)
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedVideo(acceptedFiles[0]);
  }, []);
  const [minted, setMinted] = useState(false)
  // const [amount, setAmount] = useState<number>(0)



  const { video, cid } = router.query;
  
      const [videoInfo, setVideoInfo] = useState<any>(null)
      let VideoInfo;
      if (video) {
        VideoInfo = JSON.parse(decodeURIComponent(video as string));
        
        console.log(videoInfo);
        
      }





  const remove = () => {
    setSelectedVideo(null);
  };

  const dropzoneOptions = {
    onDrop,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Title: "",
      Description: "",
      yes: false,
      no: false,
    },
  });

  const [signer, setSigner] = useState<any>('')
  const [contract, setContract] = useState<any>('')




useEffect(() => {
  (async () => {
    if (video){
      setVideoInfo(JSON.parse(decodeURIComponent(video as string)));
      }
      console.log(videoInfo);
      console.log(cid);
      const result = getAssetAddress(cid);
      const AssetAddress = await result;
      const sup = getTotalSupply(AssetAddress)
      const supply = await sup;
      setTotalSupply(supply);
      console.log(totalSupply);
      
      console.log(AssetAddress);
      setAssetAddress(AssetAddress);
      
      const initializeProvider = async () => {
          try {
              const provider = new ethers.BrowserProvider((window as any).ethereum);
              const signer = await provider.getSigner();
              setSigner(signer);
              console.log(signer);
              const shardZMarketContract = new ethers.Contract(contracts.AssetMarket, contractABI, signer);
              setContract(shardZMarketContract);
          } catch (error) {
              console.error("Error initializing provider:", error);
          }
      };
    
      // initializeProvider();
    
  })(); // Notice the immediate invocation here
}, []);


function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }



  if(!videoInfo){
    return(
      <div className='bg-[#0D0D0E]' style={{
        backgroundImage: `url(${ellipse.src})`,
        width: '100%',
          height: '100%',
          backgroundSize: "cover",
          backgroundRepeat: 'no-repeat',
        }} >
          </div>
    )
  }



  

  // Function to handle change in portion input
  const handlePortionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value);
    if (isNaN(newValue)) newValue = 0; // Set to 0 if NaN
    if (newValue < 1) newValue = 1; // Minimum value
    if (newValue > 100) newValue = 100; // Maximum value
    setPortion(newValue);
  };

  // Function to handle change in price input
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setPrice(newValue);
  };

  // Function to increment/decrement portion by 1
  const incrementPortion = () => {
    if (portion < 100) setPortion(portion + 1);
  };

  const decrementPortion = () => {
    if (portion > 1) setPortion(portion - 1);
  };




  
  const publish = async() =>{
    
  }


  // const mint = async() =>{
  //   mintTokens(cid, assetAddress, amount)
  // }



  return (
    <div className='bg-[#0D0D0E]' style={{
      backgroundImage: `url(${ellipse.src})`,
      width: '100%',
        height: '100%',
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
      }} >

        {/* {videoInfo ? ():(<></>)} */}


        <Nav />

        <div className='hidden md:block' >
        
        
        

      <h1 className='text-center text-[#33C1EE] mr-[2vw] mt-[2vw] font-bold text-[2vw]' >Video Details</h1>

      <div className='flex justify-around ' >
          <Form {...form}>
        <div className='text-white w-[50%] m-[5vw] ' >

        
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[100%]">
              <FormField
                
                control={form.control}
                name="Title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Title (required) </FormLabel>
                    <FormControl className='rounded-[0.5vw]' >
                      <Input disabled className='bg-[#00000033]' {...field} value={videoInfo.fileName.substring(0, videoInfo.fileName.lastIndexOf(' '))}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Description </FormLabel>
                    <FormControl className='rounded-[0.5vw]' >
                      <textarea disabled rows={10} className='w-full  p-2 bg-[#00000033] border ' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

                <div className="mt-4 cursor-pointer ">
     
                  <div className='w-[25vw]' >
                    <div className='flex justify-between' >
                      <img
                      src={`https://gateway.lighthouse.storage/ipfs/${videoInfo.fileName.substring(videoInfo.fileName.lastIndexOf(' ') + 1)}`}
                      alt="Selected Thumbnail"
                      className=" w-[10vw] max-h-32 object-cover rounded-lg  border  border-cyan-400"
                      />
                    </div>
                  </div>
                </div>

            </form>




        </div>

        <div className='w-[50%] m-[5vw] rounded-[0.5vw]' >
          {/* <video className=' w-[100%] rounded-[0.5vw] border border-cyan-500' controls preload="none"> 
            <source src="/path/to/video.mp4" type="video/mp4" />
          </video> */}
           <div className="mt-4">
      <div>

          <div>
          <div className="relative ">
            <video
              src={`https://gateway.lighthouse.storage/ipfs/${videoInfo.cid}`}
              className="w-full border border-cyan-500 rounded-[0.5vw]"
              controls
            />
          </div>
          </div>

      </div>
     
    </div>
        </div>
          </Form>

      </div>

      {/* <h1 className='text-center text-[#33C1EE] mr-[2vw] mt-[2vw] font-bold text-[2vw]' >Publish to Marketplace</h1> */}
      <div className="w-full flex justify-center items-center">
      <h1 className="text-3xl font-bold m-4 text-white text-center">Publish your Content to 
      {" "}
        <Link href={'Marketplace'}
            className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-[length:100%_4px] bg-no-repeat bg-bottom">
            Marketplace
        </Link>
    </h1>
    </div>




      </div>
      <div className=' pb-[5vw] md:hidden' >
    
        <div className="m-4">
      <div>
          <div>
          <div className="relative ">
            <video
              src={`https://gateway.lighthouse.storage/ipfs/${videoInfo.cid}`}
              className="w-full border border-cyan-500 rounded-[0.5vw]"
              controls
            />
          </div>
          </div>

      </div>
    </div>
    <div className='text-white  m-[5vw] ' >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[100%]">
              <FormField
                control={form.control}
                name="Title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Title (required) </FormLabel>
                    <FormControl className='rounded-[2vw]' >
                      <Input className='bg-[#00000033]' {...field} disabled value={videoInfo.fileName.substring(0, videoInfo.fileName.lastIndexOf(' '))}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Description </FormLabel>
                    <FormControl className='rounded-[2vw]' >
                      <textarea disabled rows={10} className='w-full  p-2 bg-[#00000033] border ' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

      </div>

      {totalSupply>0 ? 
      (
        <div>
          <div>
            Total Supply:
            <p>{totalSupply}</p>
          </div>
      <Publish cid={cid} assetAddress={assetAddress}/>
      </div>
    ) : (
      <Mint cid={cid} assetAddress={assetAddress}/>
      ) }


    {/* <Mint cid={cid} assetAddress={assetAddress}/>

    <Publish cid={cid}/> */}

    </div>
  );
}

export default UploadPage;
