import contractABI from '@/public/abi/createNft.json';
import marketContractABI from '@/public/abi/assetMarket.json';
import AssetABI from '@/public/abi/Asset.json'
// import { ethers } from 'ethers';

export const contracts = {
    makeNFT: '0x23Ef0e4f4031c2d0DeeB4C1f7b8fe097a8276342',
    // AssetMarket: '0xd86E615190bE769ee53C7Eca8D4968720DeA69EE'
    // AssetMarket: '0x93Ea4d5B118961f000C20673F4c4ED69700500a7'
    // AssetMarket: '0x2986302AC843926441FAbA8C36f85FC4533F9382'
    // AssetMarket: '0x99D8EbF5500069dc2c194f9005fD7bE320eD8c1e'
    AssetMarket: '0x0fe5F3f03354d43187B8A4F6f2d5F95b0b76070f'
}

export const abi = {
    makeNFT: contractABI,
    AssetMarket: marketContractABI,
    Asset: AssetABI
}

// export const lighthouseAPI = 'edf09a91.36418496da29464da5a6feb33c4bd2a0'
export const lighthouseAPI = '54a8b7ab.8c4a0a96af014ebdbfee7cfe0b70fad2'

export const lighthouseText = '5c4b26fe.60a61e50468846a7a38630c43e7e6197'