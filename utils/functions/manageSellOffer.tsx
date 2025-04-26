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

const manageSellOffer = async (asset_issuer: string) => {
  try {
    let txresult: any;
    
    const server = await new DiamSdk.Aurora.Server(
        "https://diamtestnet.diamcircle.io/"
      );
    const account = await server.loadAccount(publicKey);
    console.log(
        "Account Details:",
        account
    );
    const issuerAccount = await server.loadAccount(asset_issuer);
    console.log(issuerAccount);
    
    
    const asset = new DiamSdk.Asset("Newasset", asset_issuer);

    const transaction = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: "Diamante Testnet 2024",
      }).addOperation(
        Operation.changeTrust({
          asset: asset,
        })
      )
      .addOperation(Operation.manageSellOffer({
        selling: asset,
        buying: DiamSdk.Asset.native(),
        amount: '10',
        price: '5',
        offerId: '0',
        source: publicKey
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

const text = txresult.message.data.offerResults[0].currentOffer.offerId;
const apiKey = lighthouseText
const name = txresult.message.data.offerResults[0].currentOffer.offerId //Optional

const response = await lighthouse.uploadText(text, apiKey, name)

console.log(response)

  } catch (error) {
    console.error("Error getting Video Details:", error);
    return error;
  }
};

export default manageSellOffer;
