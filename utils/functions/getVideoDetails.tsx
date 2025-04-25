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

const getVideoDetails = async (asset_issuer: string) => {
  try {
    const server = await new DiamSdk.Aurora.Server(
        "https://diamtestnet.diamcircle.io/"
      );
    const account = await server.loadAccount(asset_issuer);
    console.log(
        "Account Details:",
        account
    );
    
    const videoCid = Buffer.from(account.data_attr.videoCid, "base64").toString("utf-8");
    const videoInfo = await lighthouse.getFileInfo(videoCid);
    console.log(videoInfo);
    
    // const thumbnailCID = videoInfo.data.fileName.substring(
    //   videoInfo.data.fileName.lastIndexOf(" ") + 1
    // );
    const title = Buffer.from(account.data_attr.title, "base64").toString("utf-8");
    const description = Buffer.from(account.data_attr.description, "base64").toString("utf-8");
    const thumbnailCid = Buffer.from(account.data_attr.thumbnailCid, "base64").toString("utf-8");
    console.log({
        videoInfo: videoInfo,
        thumbnailCID: thumbnailCid,
        title: title,
        description: description,});
    
    return({
      videoInfo: videoInfo,
      thumbnailCID: thumbnailCid,
      title: title,
      description: description,})
  } catch (error) {
    console.error("Error getting Video Details:", error);
    return error;
  }
};

export default getVideoDetails;
