//Problem) Create an app that connects the user wallet and display its NFT assets on a simple galery

//1)Connect wallet and get the user address; ✅
//2)Fetch data from user address using External API;✅
//3)Push non zero assets into an array;✅
//4)Look if the assets have a link
//5)If yes push those into an array of "NFTs"
//6)Get all asset information
//7)Display the assets into the HTML.
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

//Document variables
const connectButton = document.querySelector(".connect-wallet");

//Global Variables

let userAddress;
let userNonZeroAssets = [];
let nft = [];
let nftUrl = [];
let assetData;

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

//Connect the user wallet and get the user address
import MyAlgoConnect from "@randlabs/myalgo-connect";

const myAlgoWallet = new MyAlgoConnect();

async function connectToMyAlgo() {
  try {
    const accounts = await myAlgoWallet.connect();
    const addresses = accounts.map((account) => account.address);
    userAddress = addresses;
    fetchUserData(userAddress);

    console.log(addresses);
  } catch (err) {
    console.error(err);
  }
}

function connectToMyAlgo_() {
  connectToMyAlgo().catch(console.error);
}

connectButton.addEventListener("click", connectToMyAlgo_);

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

//Fetch user data using API Call
async function fetchUserData(userAddress) {
  if (userAddress) {
    const response = await fetch(
      `https://algoindexer.algoexplorerapi.io/v2/accounts/${userAddress}`
    );
    const data = await response.json();
    const [...userAssets] = [...data.account.assets];

    //Pushing the users nonZeroBalance Assets to the array
    for (const [i] of userAssets.entries()) {
      if (userAssets[i].amount > 0) {
        userNonZeroAssets.push([userAssets[i]["asset-id"]]);
      }
    }
    console.log(data);
    console.log(userAssets);
    console.log(userNonZeroAssets);
    for (const [i] of userNonZeroAssets.entries()) {
      fetchAssetData(userNonZeroAssets[i]);
    }
  }
  console.log(nft);
  console.log(nftUrl);
}

async function fetchAssetData(assetID) {
  const response = await fetch(
    `https://algoindexer.algoexplorerapi.io/v2/assets/${assetID}`
  );
  const data = await response.json();
  nft.push(data.asset.params.name);
  nftUrl.push(data.asset.params.url);
}
