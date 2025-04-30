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
import lighthouse from "@lighthouse-web3/sdk";
import { lighthouseAPI, lighthouseText } from "@/utils/config";

const publicKey = Cookies.get("publicKey");

const buyOffer = async (offerId: any, amount: any) => {
  try {

    const res = await fetch(
        `https://diamtestnet.diamcircle.io/offers/${offerId}`
      );
    const offer = await res.json();
    console.log(offer);
    

    const price = Number(offer.price)

    let txresult: any;
    
    const server = await new DiamSdk.Aurora.Server(
        "https://diamtestnet.diamcircle.io/"
      );
    const account = await server.loadAccount(publicKey);
    console.log(
        "Account Details:",
        account
    );
    const issuerAccount = await server.loadAccount(offer.selling.asset_issuer);
    console.log(issuerAccount);
    
    
    const asset = new DiamSdk.Asset("Newasset", offer.selling.asset_issuer);

    const transaction = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: "Diamante Testnet 2024",
      }).addOperation(
        Operation.changeTrust({
          asset: asset,
        })
      )
      .addOperation(Operation.manageBuyOffer({
        selling: DiamSdk.Asset.native(),
        buying: asset,
        buyAmount: String(amount),
        price: String(price),
        offerId: '0',
      }))
      .setTimeout(30)
  .build();
//   transaction.sign();

const xdr = transaction.toXDR();
      console.log(transaction);
      await (window as any).diam
  .sign(
    xdr,
    true,
    "Diamante Testnet 2024"
  )
  .then((res: any) => {
    txresult = res;
    console.log(res)
    
  return res;
});

  } catch (error) {
    console.error("Error getting Video Details:", error);
    return error;
  }
};

export default buyOffer;
