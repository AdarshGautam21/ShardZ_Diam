var DiamSdk = require("diamnet-sdk");
import Cookies from "js-cookie"
  var {Aurora,
    Keypair,
    Operation,
    BASE_FEE,
    TransactionBuilder,} =  require("diamnet-sdk");

const publicKey = Cookies.get("publicKey")

const Diam = async() =>{
    const astroDollar = new DiamSdk.Asset('AstroDollar', publicKey)
    console.log(astroDollar);    
}

export default Diam;