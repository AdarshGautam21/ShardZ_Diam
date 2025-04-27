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

const getAsset = async () => {
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
    console.log(myAssets.balances[0].asset_issuer);
    const response = await lighthouse.getUploads(lighthouseAPI);
    



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

const filteredFiles = [];

for (let index = 0; index < myAssets.balances.length; index++) {
  const balance = myAssets.balances[index];

  if (
    balance.asset_issuer  &&
    parseFloat(balance.balance) > 50
  ) {
    const acc = await server.loadAccount(balance.asset_issuer);

    if (acc.data_attr.videoCid) {
      const decodedCid = Buffer.from(acc.data_attr.videoCid, "base64").toString("utf-8");

      const matchingFile = response.data.fileList.find((file) => file.cid === decodedCid);

      filteredFiles.push({
        file: matchingFile || null,
        assetIssuer: acc,
      });
    } else {
      filteredFiles.push({
        file: null,
        assetIssuer: acc,
      });
    }
  }
}

    
    console.log(filteredFiles);
    return filteredFiles;
  } catch (error) {
    console.error("Error in Diam function:", error);
    return error;
  }
};

export default getAsset;
