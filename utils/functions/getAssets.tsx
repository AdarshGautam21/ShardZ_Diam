var DiamSdk = require("diamnet-sdk");
import Cookies from "js-cookie";
var {
  Aurora,
  Keypair,
  Operation,
  BASE_FEE,
  TransactionBuilder,
} = require("diamnet-sdk");
import {obj, secret, pub} from "@/utils/key";
const publicKey = Cookies.get("publicKey");



const getAsset = async () => {
  try {
    console.log("hello");


    const server = await new DiamSdk.Aurora.Server(
      "https://diamtestnet.diamcircle.io/"
    );
    const distributorKeypair = DiamSdk.Keypair.fromSecret(secret);
    console.log(distributorKeypair)    
    
    const assets = await server.assets().forIssuer(publicKey).call();
    console.log(assets);

    // const res = await fetch(`https://diamtestnet.diamcircle.io/accounts/${publicKey}`)
    const res = await fetch(`https://diamtestnet.diamcircle.io/accounts/GDI4MPQXKCWGLYWCJ4H7OSTKBWGKWGTD3RNJUCR463TO76MWJJWJ4K6J`)
    const myAssets =await res.json()
    console.log(myAssets);
    

    
  } catch (error) {
    console.error("Error in Diam function:", error);
    return error;
  }
};

export default getAsset;