var DiamSdk = require("diamnet-sdk");
import Cookies from "js-cookie";
var {
  Aurora,
  Keypair,
  Operation,
  BASE_FEE,
  TransactionBuilder,
} = require("diamnet-sdk");

const publicKey = Cookies.get("publicKey");

const issueAsset = async () => {
  try {
    console.log("hello");

    const astroDollar = await new DiamSdk.Asset("Globe", publicKey);
    console.log(astroDollar);

    const server = await new DiamSdk.Aurora.Server(
      "https://diamtestnet.diamcircle.io/"
    );
    const account = await server.loadAccount(publicKey);

    var transaction = new DiamSdk.TransactionBuilder(account, {
        fee: 100,
        networkPassphrase: DiamSdk.Networks.TESTNET,
      })
        // The `changeTrust` operation creates (or alters) a trustline
        // The `limit` parameter below is optional
        .addOperation(
          DiamSdk.Operation.changeTrust({
            asset: astroDollar,
            limit: "1000",
          })
        )
        // setTimeout is required for a transaction
        .setTimeout(100)
        .build();
    console.log(transaction);    
    return transaction;
  } catch (error) {
    console.error("Error in Diam function:", error);
    return error;
  }
};

export default issueAsset;
