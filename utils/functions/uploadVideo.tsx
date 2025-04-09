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



const issueAsset = async () => {
  try {
    console.log("hello");

    const astroDollar = await new DiamSdk.Asset("ASSETT", publicKey);
    console.log(astroDollar);

    const server = await new DiamSdk.Aurora.Server(
      "https://diamtestnet.diamcircle.io/"
    );

  //  const key = nacl.sign.keyPair.fromSeed(Uint8Array.from(obj._secretKey.data));
  //  console.log(key);

   const hex = Buffer.from(obj._secretSeed.data).toString('hex');
console.log('Hex:', hex);
   

    const distributorKeypair = DiamSdk.Keypair.fromSecret(secret);
    console.log(distributorKeypair)    
    
    const account = await server.loadAccount(distributorKeypair.publicKey());
    console.log(account);

    const transaction = new DiamSdk.TransactionBuilder(account, {
      fee: DiamSdk.BASE_FEE,
      networkPassphrase: DiamSdk.Networks.TESTNET,
    })

      .addOperation(
        DiamSdk.Operation.changeTrust({
          asset: astroDollar,
          limit: "1000",
          source: distributorKeypair.publicKey(),
        })
      )
      .setTimeout(100)
      .build();
      console.log(transaction);
      

      const res =  await transaction.sign(distributorKeypair);
      const result = await server.submitTransaction(transaction)
      
        
      return result;
  } catch (error) {
    console.error("Error in Diam function:", error);
    return error;
  }
};

export default issueAsset;
