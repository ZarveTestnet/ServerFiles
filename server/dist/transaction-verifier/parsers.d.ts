import { PublicKey } from "@solana/web3.js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
export declare function parseOffer(record: PublicKey): Promise<{
    deck: PublicKey;
    seller: PublicKey;
    nft_mint: PublicKey;
} | undefined>;
export declare function parseMetadata(record: PublicKey | string): Promise<Metadata | undefined>;
//# sourceMappingURL=parsers.d.ts.map