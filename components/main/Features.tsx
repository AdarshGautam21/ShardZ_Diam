import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NFT from '@/public/images/NFT 4.png';
import sdk from '@/public/images/sdk.png';
import shield from '@/public/images/shield-security.png';
import swap from '@/public/images/swap.png';
import coin from '@/public/images/coins.png';
import img from '@/public/images/img.png';
import right from '@/public/images/bigright.png';
import rightrectangle from '@/public/images/Rectangle 4.png';
import diam from '@/public/images/diam_logo.png';
import { Button } from '../ui/button';

function Features() {
  return (
    <div className="mx-[2vw] mt-[4vw] pb-[5vw] bg-gradient-to-b from-black from-[80%] rounded-3xl to-[#33C1EE] to-[120%] relative">
      <div className="w-[75vw] mx-auto space-y-6">
        {/* Feature Cards */}
        <div className="flex h-[18vw] space-x-4">
          <FeatureCard
            title="NFT Integration"
            description="Elevate your content into unique digital assets seamlessly, allowing creators to mint their videos effortlessly."
            image={NFT}
            large
          />
          <SmallCard
            title="Fractionalized Trading"
            description="Democratize access to exclusive content and digital collectibles, empowering investors to trade fractional ownership."
            image={sdk}
          />
        </div>

        <div className="flex h-[18vw] space-x-4">
          <SmallCard
            title="Enhanced Security"
            description="Rest easy with top-notch security protocols, ensuring the safety of your data and transactions."
            image={shield}
          />
          <FeatureCard
            title="Multi-Chain Compatibility"
            description="Enjoy unparalleled flexibility across various blockchain networks, ensuring seamless interaction and transactions."
            image={coin}
            large
          />
        </div>

        <div className="flex h-[18vw] space-x-4">
          <FeatureCard
            title="Transparent Revenue Sharing"
            description="Experience fair and transparent revenue distribution among creators, investors, and viewers."
            image={null}
            large
          />
          <SmallCard
            title="Fractionalized Trading"
            description="Democratize access to exclusive content and digital collectibles, empowering investors to trade fractional ownership."
            image={swap}
          />
        </div>

        {/* Text Sections */}
        <div className="text-center space-y-4">
          <GradientText text="BENEFITS" />
          <h2 className="font-extrabold text-white text-[3.5vw] sm:text-[3vw] md:text-[2.5vw]">
            Own Your Content, Earn Your Worth
          </h2>
          <p className="text-white text-[2vw]">
            ShardZ enables creators to convert their videos into NFTs, granting full ownership and control, leading to diverse revenue streams and enhanced monetization opportunities.
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <h2 className="font-extrabold text-white text-[3.5vw] sm:text-[3vw] md:text-[2.5vw]">
            Join ShardZ Today and Shape the Future of Streaming!
          </h2>
          <p className="text-white text-[2vw]">
            Join our vibrant community today. Sign up now and be part of the future of streaming! Welcome to ShardZ, where creativity meets technology, and every interaction is valued.
          </p>
          <div className="bg-white rounded-full w-[20vw] mx-auto h-[6vw] sm:h-[5vw] md:h-[3vw] flex justify-center items-center">
            <Link href="/VideoPage">
              <Button
                className="rounded-full px-[1vw] py-0 text-center text-[2.5vw] sm:text-[2vw] md:text-[1.5vw] lg:text-[1vw]"
                variant="secondary"
              >
                Get Started -{'>'}
              </Button>
            </Link>
          </div>
        </div>

        {/* Partners Section */}
        <div className="flex flex-col items-center mt-60">
          <h2 className="font-extrabold text-white text-[2.5vw] sm:text-[2vw] md:text-[1.5vw]">
            PARTNERS
          </h2>
          <Image src={diam} alt="Partners" width={80} height={80} />
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({ title, description, image, large }: any) => (
  <div
    className={`relative flex ${
      large ? 'w-2/3' : 'w-1/3'
    } bg-[#101012] rounded-2xl items-center`}
  >
    <div className="text-left space-y-1 ml-[4vw] pt-[3vw]">
      <p className="text-white text-[1.5vw]">{title}</p>
      <p className="text-[#BABCD2] text-[1vw]">{description}</p>
    </div>
    {image && (
      <div className="absolute right-0 bottom-0">
        <Image className="h-[12vw] w-[12vw]" alt={title} src={image} />
      </div>
    )}
  </div>
);

const SmallCard = ({ title, description, image }: any) => (
  <div className="w-1/3 bg-[#101012] rounded-2xl p-[2vw]">
    <Image className="w-[5vw] h-[5vw]" alt={title} src={image} />
    <p className="text-white text-[1.5vw]">{title}</p>
    <p className="text-[#BABCD2] text-[1vw]">{description}</p>
  </div>
);

const GradientText = ({ text }:  any) => (
  <p className="bg-gradient-to-t from-[#28cdffc7] to-[#33C1EE] text-transparent font-extrabold bg-clip-text text-[2vw]">
    {text}
  </p>
);

export default Features;
