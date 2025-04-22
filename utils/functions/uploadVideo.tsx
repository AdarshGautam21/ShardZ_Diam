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



const issueAsset = async (cid: any, description: any, title: any) => {
  try {
    console.log("hello");
    console.log(cid);
    

    console.log(publicKey);

    const issuer = DiamSdk.Keypair.random()
    console.log(issuer);
    console.log(issuer.publicKey());
    
    

    const newAsset = await new DiamSdk.Asset("Newasset", issuer.publicKey());
    console.log(newAsset);

    const server = await new DiamSdk.Aurora.Server(
      "https://diamtestnet.diamcircle.io/"
    );

//    const hex = Buffer.from(obj._secretSeed.data).toString('hex');
// console.log('Hex:', hex);
      
    
    const account = await server.loadAccount(publicKey);
    console.log(account);
    const numOperations = 8;
    const totalFee = ((BASE_FEE * numOperations) / Math.pow(10, 7)).toString();

    console.log(cid);
    

    const transaction = new DiamSdk.TransactionBuilder(account, {
      fee: DiamSdk.BASE_FEE,
      networkPassphrase: "Diamante Testnet 2024",
    })
    .addOperation(
      Operation.payment({
        destination: publicKey,
        asset: DiamSdk.Asset.native(),
        amount: totalFee,
        source: publicKey,
      })
    )
    .addOperation(
      Operation.createAccount({
        destination: issuer.publicKey(),
        startingBalance: "0.0001",
        source: publicKey,
      })
    )
    .addOperation(
      DiamSdk.Operation.manageData({
        source: issuer.publicKey(), // The source account for the operation
        name: "videoCid", // The name of the data entry
        value: cid, // The value to store
      })
    )
    .addOperation(
      DiamSdk.Operation.manageData({
        source: issuer.publicKey(), // The source account for the operation
        name: "title", // The name of the data entry
        value: title, // The value to store
      })
    )
    .addOperation(
      DiamSdk.Operation.manageData({
        source: issuer.publicKey(), // The source account for the operation
        name: "description", // The name of the data entry
        value: description, // The value to store
      })
    )
      .addOperation(
        DiamSdk.Operation.changeTrust({
          asset: newAsset,
          limit: "100",
          source: publicKey,
        })
      )
      .addOperation(
        Operation.payment({
          destination: publicKey,
          source: issuer.publicKey(),
          asset: newAsset,
          amount: "100",
        })
      )
      .addOperation(
        Operation.setOptions({
          source: issuer.publicKey(),
          masterWeight: 0,
        })
      )
      .setTimeout(100)
      .build();

      transaction.sign(issuer);

      const xdr = transaction.toXDR();
      console.log(transaction);
      await (window as any).diam
  .sign(
    xdr,
    true,
    "Diamante Testnet 2024"
  )
  .then((res: any) => {
    console.log(res)
  return res;
});
      
  } catch (error) {
    console.error("Error in Diam function:", error);
    return error;
  }
};

export default issueAsset;
