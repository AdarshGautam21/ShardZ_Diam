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
import { lighthouseAPI, lighthouseText } from "@/utils/config";

const getOffers = async () => {
  try {
    const allOffers: any = [];
    
    const server = await new DiamSdk.Aurora.Server(
      "https://diamtestnet.diamcircle.io/"
    );
    const response = await lighthouse.getUploads(lighthouseText);
    console.log(response);

    const data = response.data.fileList;

    for (let index = 0; index < data.length; index++) {
      const res = await fetch(
        `https://diamtestnet.diamcircle.io/offers/${data[index].fileName}`
      );
      const offer = await res.json();
      allOffers.push(offer);
    }

    console.log(allOffers);

    for (let index = 0; index < allOffers.length; index++) {
      const element = allOffers[index];
      const account = await server.loadAccount(allOffers[index].selling.asset_issuer);
      console.log(
          "Account Details:",
          account
      );
      allOffers[index].account = account
      
    }
    console.log(allOffers);
    
    return allOffers;
  } catch (error) {
    console.error("Error getting Video Details:", error);
    return error;
  }
};

export default getOffers;
