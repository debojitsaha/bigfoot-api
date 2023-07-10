import { NextFunction, Request, Response } from "express";
import {
  Connection,
  PublicKey,
  Keypair,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { GenerateResponse } from "../utils/response.creator";
import bs58 from "bs58";

const privateKey: string = String(process.env.PRIVATE_KEY) || "";
const network: string = process.env.NETWORK || "";
const connection = new Connection(network);

const Pay = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { recipientAddress, amount } = req.body;

    // Create the payer's account from the provided private key
    const payerAccount = Keypair.fromSecretKey(bs58.decode(privateKey));

    // Create a transaction instruction to transfer SOL to the recipient
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: payerAccount.publicKey,
        toPubkey: new PublicKey(recipientAddress),
        lamports: amount,
      })
    );
    transaction.feePayer = payerAccount.publicKey;
    let blockhash = (await connection.getLatestBlockhash("finalized"))
      .blockhash;
    transaction.recentBlockhash = blockhash;

    // Sign the transaction with the payer's account
    transaction.partialSign(payerAccount);

    // Send and confirm the transaction
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      payerAccount,
    ]);

    return GenerateResponse(res, 200, { signature }, "Payment Successful");
  } catch (error) {
    console.error("Payment failed:", error);
    next(error);
  }
};

export { Pay };
