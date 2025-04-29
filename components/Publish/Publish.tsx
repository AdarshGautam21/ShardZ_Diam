"use client"
import React, {useState, FormEvent} from 'react'
import 'slick-carousel/slick/slick.css';
import "@/app/globals.css";
import 'slick-carousel/slick/slick-theme.css';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CreateContent from '@/utils/functions/CreateContent';
import ApproveTokens from '@/utils/functions/ApproveTokens';
import {contracts} from '@/utils/config'
import ListAsset from '@/utils/functions/ListAsset';
import listingAnimationData from '@/public/animation/listing.json'
import manageSellOffer from '@/utils/functions/manageSellOffer';
import { toast, ToastContainer } from 'react-toastify';



interface PublishProps {
  cid: any,
  assetAddress: string
}

function StudioPage(props: PublishProps) {
  const {cid, assetAddress} = props;

  const [amount, setAmount] = useState<any>(0)
  const [price, setPrice] = useState<any>(0)
  const [approving, setApproving] = useState<boolean>(false)
  const [listing, setListing] = useState<boolean>(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
  
    // const parsedNumber = parseInt(amount, 10); 
  
    if (!isNaN(amount) || !isNaN(price)) {
      await publish(); // Wait for the mint operation to complete
    } else {
      console.error("Invalid input: Please enter a number.");
    }
  };


  const publish = async() => {
    // console.log(amount, price);
    setApproving(true)

    
    // setListing(true)
    // const result = await ApproveTokens(assetAddress, amount)
    // const approve = await result;
    // ListAsset(assetAddress, amount, price)
    // setListing(false)
    const sellOffer = await manageSellOffer(assetAddress, amount, price)
    toast.success("Tokens listed successfully")
    setApproving(false)
  }

    
  return (
      <Tabs defaultValue="setprice" className=" w-[300px] md:w-[400px] lg:w-[400px]  rounded-xl mx-auto">
        {approving && <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10000 }}>
                    <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
                </div>}
        {listing && <div style={{position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
          zIndex: 9999, // Ensure the overlay is on top of other content
          filter: 'grayscale(100%)'}} />}
        {listing && (
                // <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10000 }}>
                //     <Lottie options={{ animationData: listingAnimationData }} height={300} width={300} />
                //     <br/>
                //     <h1 className='text-white text-center'>
                //     Listing Your Content
                //     </h1>
                // </div>
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10000 }}>
                    <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
                </div>
            )}
      <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger  className=' text-white text-lg bg-[#33C1EE]' value="setprice">Set Price</TabsTrigger>
        <TabsTrigger className=' text-white text-lg bg-[#33C1EE] ' value="publish">Publish</TabsTrigger>
      </TabsList>
      <TabsContent value="publish">
        <Card className='border-none' >
          <CardHeader>
            <CardTitle className='text-white text-2xl text-center font-bold' >PUBLISH</CardTitle>
            <CardDescription className='text-white text-lg font-semibold text-center' >
              Publish your content to marketPlace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-white  text-center ">
           <h2 className='text-lg font-semibold' >List your content tokens on marketplace</h2>
           <p className='font-semibold' >Want to earn from your content ? Create exclusive, limited editing tokens tied to your work . Sell a 
            portion on a marketplace, letting your fans become co-owners and setting the price per token to unlock their
            investment potential!
           </p>
          </CardContent>

        </Card>
      </TabsContent>
      <TabsContent value="setprice">
        <Card className='border-none' >
          {/* <CardHeader>
            <CardTitle className='text-white text-2xl font-bold text-center' >Price</CardTitle>
            <CardDescription className='text-lg text-white text-center font-semibold' >
                Set the price for your work!
            </CardDescription>
          </CardHeader> */}

          <form onSubmit={handleSubmit}>
          <CardContent className="space-y-2">
            <div className="space-y-1 text-white">
              <Label htmlFor="current" className='text-lg font-semibold'>Number of Tokens to publish out of 100</Label>
              <Input id="current" type="number" onChange={(e) => setAmount(parseInt(e.target.value, 10) || 0)} />
            </div>
            
          </CardContent>


          <CardContent className="space-y-2">
            <div className="space-y-1 text-white">
              <Label htmlFor="current" className='text-lg font-semibold'>Price</Label>
              <Input id="current" type="number" onChange={(e) => setPrice(parseFloat(e.target.value))}/>
            </div>
            
          </CardContent>



          <CardFooter className='mx-auto' >
            <Button type='submit' className='text-white hover:scale-110 transition-all border  border-cyan-100 bg-[#33C1EE]' >Publish to marketplace</Button>
          </CardFooter>
          </form>
        </Card>
      </TabsContent>
      <ToastContainer />
    </Tabs>
  )
}

export default StudioPage