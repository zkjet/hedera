console.clear();
require("dotenv").config();
const {
  AccountId,
  PrivateKey,
  Client,
  TopicCreateTransaction,
  TopicMessageQuery,
  TopicMessageSubmitTransaction,
} = require("@hashgraph/sdk");

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

  // const client = Client.forTestnet();
  //client.setOperator(myAccountId, myPrivateKey);

  //-----------------------<enter code below>--------------------------------------

  //Create new Keys
  const newAccountPrivateKey = await PrivateKey.generateED25519();
  const newAccountPublicKey = newAccountPrivateKey.publicKey;

  //Create a new account with 1,000 tinybar starting balance
  const newAccount = await new AccountCreateTransaction()
    .setKey(newAccountPublicKey)
    .setInitialBalance(Hbar.fromTinybars(1000))
    .execute(client);
  // Get the new account ID
  const getReceipt = await newAccount.getReceipt(client);
  const newAccountId = getReceipt.accountId;

  console.log("The new account ID is: " + newAccountId);

  // Verify the account balance
  const accountBalance = await new AccountBalanceQuery()
    .setAccountId(newAccountId)
    .execute(client);

  console.log(
    "Thew new account balance is: " +
      accountBalance.hbars.toTinybars() +
      " tinybar."
  );
}
main();
