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

const getOfferDetails = async (offerId: any) => {
  try {    
    const server = await new DiamSdk.Aurora.Server(
      "https://diamtestnet.diamcircle.io/"
    );
    const res = await fetch(
      `https://diamtestnet.diamcircle.io/offers/${offerId}`
    );

      const offer = await res.json();

    const account = await server.loadAccount(offer.selling.asset_issuer);

    return {
      account: account,
        offer: offer
    };

  } catch (error) {
    console.error("Error getting Video Details:", error);
    return error;
  }
};

export default getOfferDetails;
