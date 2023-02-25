import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
export default class Wallet {
    publicKey: PublicKey;
    keypair: Keypair;
    constructor();
    airdrop(): Promise<void>;
    send(tx: Transaction, signers: Keypair[]): Promise<void>;
}
//# sourceMappingURL=wallet.d.ts.map