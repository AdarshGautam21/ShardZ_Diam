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
    
    const assets = await server.assets().forIssuer('GAQLHQWUAZONQM7WF7FUJ5TJ5LWF4SNY7ED6OIW7CPOODRQ5DM7WZ4CF').call();
    console.log(assets);

    
  } catch (error) {
    console.error("Error in Diam function:", error);
    return error;
  }
};

export default getAsset;