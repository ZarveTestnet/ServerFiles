import Wallet from "../wallet";
import { PublicKey } from "@solana/web3.js";
export declare function createCollection(name: string, symbol: string, url: string, owner: Wallet): Promise<[PublicKey, PublicKey, PublicKey]>;
export declare function createNFT(name: string, symbol: string, url: string, owner: Wallet, collectionMint: PublicKey, collectionMeta?: PublicKey, collectionMaster?: PublicKey): Promise<any[]>;
export declare function createDeck(wallet: Wallet, collection: PublicKey): Promise<PublicKey>;
export declare function createOffer(wallet: Wallet, deck: PublicKey, mint: PublicKey, account: PublicKey, meta: PublicKey): Promise<PublicKey>;
//# sourceMappingURL=transactions.d.ts.map