var DiamSdk = require("diamnet-sdk");
import Cookies from "js-cookie";
var {
  Aurora,
  Keypair,
  Operation,
  BASE_FEE,
  TransactionBuilder,
} = require("diamnet-sdk");
import { obj, secret, pub } from "@/utils/key";
const publicKey = Cookies.get("publicKey");
import lighthouse from "@lighthouse-web3/sdk";
import { lighthouseAPI } from "@/utils/config";

const getOffers = async () => {
  try {
    const res = await fetch(
        `https://diamtestnet.diamcircle.io/offers?cursor=12&limit=1000&order=asc`
      );
      console.log(res);
        const offers = await res.json();
        console.log(offers);
        
      
    const server = await new DiamSdk.Aurora.Server(
        "https://diamtestnet.diamcircle.io/"
      );
    // const account = await server.loadAccount(asset_issuer);
    // console.log(
    //     "Account Details:",
    //     account
    // );
    
    
  } catch (error) {
    console.error("Error getting Video Details:", error);
    return error;
  }
};

export default getOffers;
