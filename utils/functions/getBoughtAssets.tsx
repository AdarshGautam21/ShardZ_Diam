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

const getBoughtAsset = async () => {
  try {
    console.log("hello");

    const server = await new DiamSdk.Aurora.Server(
      "https://diamtestnet.diamcircle.io/"
    );
    // const distributorKeypair = DiamSdk.Keypair.fromSecret(secret);
    // console.log(distributorKeypair)

    // const assets = await server.assets().forIssuer(publicKey).call();
    // console.log(assets);
    

    const res = await fetch(
      `https://diamtestnet.diamcircle.io/accounts/${publicKey}`
    );
    const myAssets = await res.json();
    console.log(myAssets);
    const cids: string[] = [];
    



//     const cidIssuerMap: any = {}; // Map CID to account (acc)

// for (let index = 0; index < myAssets.balances.length; index++) {
//   if (myAssets.balances[index].asset_issuer) {
//     const acc = await server.loadAccount(myAssets.balances[index].asset_issuer);

//     if (acc.data_attr.videoCid) {
//       const decodedValue = Buffer.from(acc.data_attr.videoCid, "base64").toString("utf-8");
//       cids.push(decodedValue);
//       cidIssuerMap[decodedValue] = acc.account_id; // map cid to its account
//     }
//   }
// }

// const filteredFiles = response.data.fileList
//   .filter((file) => cids.includes(file.cid))
//   .map((file) => ({
//     ...file,
//     assetIssuer: cidIssuerMap[file.cid], // attach the account (acc) to the file
//   }));

const purchasedAssets = [];

for (let index = 0; index < myAssets.balances.length; index++) {
  const balance = myAssets.balances[index];

  if (
    balance.asset_issuer &&
    parseFloat(balance.balance) < 50 &&
    parseFloat(balance.balance) > 0
  ) {
    const acc = await server.loadAccount(balance.asset_issuer);
    acc.balance = balance.balance; // Add the balance to the account object

    if (acc.data_attr.videoCid) {
      purchasedAssets.push(acc);
    } 
  }
}
    console.log(purchasedAssets);
    return purchasedAssets;
  } catch (error) {
    console.error("Error in Diam function:", error);
    return error;
  }
};

export default getBoughtAsset;
