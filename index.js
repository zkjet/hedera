const {
  Client,
  PrivateKey,
  AccountCreateTransaction,
  AccountBalanceQuery,
  Hbar,
} = require("@hashgraph/sdk");
require("dotenv").config();
// const client = Client.forTestnet();
//client.setOperator(myAccountId, myPrivateKey);

//-----------------------<enter code below>--------------------------------------

//Create new Keys
const newAccountPrivateKey = await PrivateKey.generateED25519();
const newAccountPublicKey = newAccountPrivateKey.publicKey;

async function main() {
  // Grab your Hedera testnet account ID and private key from your .env file
  const myAccountId = process.env.MY_ACCOUNT_ID;
  const myPrivateKey = process.env.MY_PRIVATE_KEY;

  // If we weren't able to grab it, we should throw a new error
  if (myAccountId == null || myPrivateKey == null) {
    throw new Error(
      "Environment variables myAccountId and myPrivateKey must be present"
    );
  }
  // Create our connection to the Hedera network
  // The Hedera JS SDK Makes this really easy!
  const client = Client.forTestnet();

  client.setOperator(myAccountId, myPrivateKey);
}
main();
